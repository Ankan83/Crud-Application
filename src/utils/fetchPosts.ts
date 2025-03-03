import { Posts } from "@/types/posts";

export const fetchPosts = async (): Promise<Posts[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}