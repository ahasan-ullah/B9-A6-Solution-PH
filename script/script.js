const loadAllPosts=async(searchText)=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
  const data=await res.json();
  console.log(data.posts);
};



loadAllPosts();
const handleSearchByCategory=()=>{
  const searchText=document.getElementById('searchPosts').value;
  loadAllPosts(searchText);
};