export async function addPost(postData: { title: any; content: any; }) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postData.title,
        body: postData.content,
        userId: 1, 
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add post");
    }
  
   return  await response.json();
    // console.log("newPost ", newPost)
    // return { ...newPost, id: Math.floor(Math.random() * 1000) + 101 }; 
  }
  