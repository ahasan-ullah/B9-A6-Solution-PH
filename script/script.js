const loadAllPosts=async(searchText)=>{
  document.getElementById('post-container').innerHTML="";
  const res=await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${searchText?`?category=${searchText}`:''}`);
  const data=await res.json();
  displayAllPosts(data.posts);
};

const displayAllPosts=(posts)=>{
  const postContainer=document.getElementById('post-container');
  posts.forEach(post=>{
    const div=document.createElement('div');
    div.innerHTML=
    `
      <div class="p-6 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl">
        <div class="indicator">
          <span class="indicator-item badge ${post.isActive?"bg-green-600":"bg-red-500"}"></span>
          <div class="avatar">
            <div class="w-24 rounded-xl">
              <img src=${post.image}/>
            </div>
          </div>
        </div>
        <div class="space-y-4 w-full">
          <div class="flex gap-4 *:opacity-60">
            <p># ${post.category}</p>
            <p>Author: ${post.author.name}</p>
          </div>
        <h3 class="text-2xl font-bold opacity-70">${post.title}</h3>
        <p class="opacity-40">${post.description}</p>
        <hr class="border border-dashed border-gray-300"/>
        <div class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45">
          <div class="gap-4">
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-comment-dots"></i>
              <p>${post.comment_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-eye"></i>
              <p>${post.view_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-clock"></i>
              <p>${post.posted_time} Min</p>
            </div>
          </div>
          <div class="opacity-100">
            <button id="addToList" onclick="markAsRead('${post.description}','${post.view_count}')" class="addToList btn btn-circle bg-green-500 btn-sm"><i class="fa-solid fa-envelope-open text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
    postContainer.appendChild(div);
  });
}

const markAsRead=(desc,viewCount)=>{
  const markAsReadContainer=document.getElementById('markAsReadContainer');
  const div=document.createElement('div');
  div.innerHTML=`
  <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
    <div class="lg:w-4/5 w-11/12">
      <p>${desc}<p>
    </div>
    <div class="lg:w-1/5 w-4/12 flex justify-end">
      <p><i class="fa-regular fa-eye"></i>${viewCount}</p>
    </div>
  </div>
  `;
  markAsReadContainer.appendChild(div);
  handleCount();
}

const handleCount=()=>{
  const prevCount=document.getElementById('markAsReadCounter').innerText;
  const convertedCount=parseInt(prevCount);
  const sum=convertedCount+1;
  document.getElementById('markAsReadCounter').innerText=sum;
}

loadAllPosts();
const handleSearchByCategory=()=>{
  const searchText=document.getElementById('searchPosts').value;
  loadAllPosts(searchText);
};