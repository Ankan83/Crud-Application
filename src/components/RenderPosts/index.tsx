"use client";

import Link from "next/link";

import { UseMutateFunction } from "@tanstack/react-query";

import { Posts, PostWithoutUserID } from "@/types/posts";

type Props = {
  handleEdit: (post: PostWithoutUserID) => void;
  posts?: Posts[];
  isLoading: boolean;
  deletePost: UseMutateFunction<object, Error, number, unknown>;
  setIsAddPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deletePending: boolean;
};

export default function RenderPosts({
  handleEdit,
  posts,
  isLoading,
  deletePost,
  deletePending,
  setIsAddPostModalOpen,
}: Props) {
  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddPostModalOpen(true)}
        >
          Add Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts?.map((post: PostWithoutUserID) => (
          <div key={post.id} className="card bg-base-100 shadow-lg p-4">
            <Link href={`/post/${post.id}`}>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.body}</p>
            </Link>
            <div className="mt-4 flex gap-2">
              <button
                className="btn btn-warning"
                onClick={() => handleEdit(post)}
              >
                Edit
              </button>
              <button
                className="btn btn-error"
                onClick={() => deletePost(post.id)}
                disabled={deletePending}
              >
                {deletePending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
