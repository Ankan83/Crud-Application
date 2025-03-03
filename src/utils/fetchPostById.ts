import { Posts } from "@/types/posts";

export const fetchPostById = async ({queryKey}: {queryKey: string[]}): Promise<Posts> => {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${queryKey[1]}`);
    return postResponse.json();
}