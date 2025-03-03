export const deletePost = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "DELETE" });
  return res.json();
};