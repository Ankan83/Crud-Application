export async function addPost(postData: { title: string; body: string; }) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postData.title,
        body: postData.body,
        userId: 1, 
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add post");
    }
  
   return  await response.json();
  }
  