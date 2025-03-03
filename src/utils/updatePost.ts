export const updatePost = async ({ id, title, body }: { id: number; title: string; body: string }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, body, userId: 1 }),
    });
    return res.json();
  };