"use client";

import { useEffect, useState } from "react";
import RenderPosts from "../RenderPosts";
import UpdatePostForm from "../UpdatePostForm";
import AddPostForm from "../AddPostform";

import { Posts, PostWithoutUserID } from "@/types/posts";
import { fetchPosts } from "@/utils/fetchPosts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePost } from "@/utils/deletePost";
import { addPost } from "@/utils/addPost";

export default function PostList() {
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [successBannerMessage, setSuccessBannerMessage] = useState<string>("");
  const [postsList, setPostsList] = useState<Posts[]>([]);
  const [editingPost, setEditingPost] = useState<null | PostWithoutUserID>(
    null
  );
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (data, variables) => {
      console.log("variables ", variables);
      handlePostDeleteSuccessBanner();
      deleteItemFromPostList(variables);
    },
  });

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      handlePostAddSuccessBanner();
      setPostsList((prevPosts) => [newPost, ...prevPosts]);
      setIsAddPostModalOpen(false);
    },
  });

  const handlePostUpdateSuccessBanner = () => {
    setShowSuccessBanner(true);
    setSuccessBannerMessage("Post Updated changes should be reflecting");
    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 5000);
  };

  const handlePostDeleteSuccessBanner = () => {
    setShowSuccessBanner(true);
    setSuccessBannerMessage(
      "Post deleted post should be removed from the list"
    );
    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 5000);
  };

  const handlePostAddSuccessBanner = () => {
    setShowSuccessBanner(true);
    setSuccessBannerMessage("Post added successfully");
    setTimeout(() => setShowSuccessBanner(false), 5000);
  };

  const handleEdit = (post: PostWithoutUserID) => {
    setEditingPost(post);
  };

  // This Method is to update the list of posts that need to be displayed after post update operation
  // This method is required because jsonplaceholder data doesn't change so this method update the returned value
  // from the updatation api to list
  // If the post data changes were persistant then we can use refetch instead
  const updatePostList = (updatedPost: Posts) => {
    setPostsList((postList) =>
      postList.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      })
    );
  };

  // This Method is to update the list of posts that need to be displayed after delete operation
  // This method is required because jsonplaceholder data doesn't change so this method update the returned value
  // from the updatation api to list
  // If the post data changes were persistant then we can use refetch instead
  const deleteItemFromPostList = (postId: number) => {
    setPostsList((postList) => postList.filter((post) => post.id != postId));
  };

  useEffect(() => {
    setPostsList(data || []);
  }, [data]);

  return (
    <>
      {showSuccessBanner && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{successBannerMessage}</span>
          </div>
        </div>
      )}

      {isAddPostModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative">
            <h3 className="text-lg font-bold">Add New Post</h3>
            <AddPostForm
              addPostMutation={addPostMutation}
              closeModal={() => setIsAddPostModalOpen(false)}
            />
          </div>
        </div>
      )}

      {editingPost && (
        <UpdatePostForm
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          handleSuccessBanner={handlePostUpdateSuccessBanner}
          updatePostList={updatePostList}
        />
      )}

      <RenderPosts
        handleEdit={handleEdit}
        posts={postsList}
        isLoading={isLoading}
        deletePost={deletePostMutation}
        setIsAddPostModalOpen={setIsAddPostModalOpen}
      />
    </>
  );
}
