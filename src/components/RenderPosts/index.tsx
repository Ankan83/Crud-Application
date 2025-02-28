import Link from "next/link";

export default async function RenderPosts(){
    
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const postList = await response.json();

  return (
    <div className="flex ">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {postList.map((post, index) => {
          return (

            <div className="card bg-base-100 shadow-xl w-1/4" key={index}>
              <Link href={`/post/${post.id}`}  >
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}