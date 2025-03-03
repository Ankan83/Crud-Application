"use client";

import { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type Props = {
  addPostMutation: UseMutationResult<
    any,
    Error,
    {
      title: any;
      content: any;
    },
    unknown
  >;
  closeModal: () => void;
};

export default function AddPostForm({ addPostMutation, closeModal }: Props) {
  const { register, handleSubmit } = useForm();

  if (!addPostMutation || !addPostMutation.mutate) {
    console.error("Error: addPostMutation is undefined!");
    return <p className="text-red-500">Error loading form.</p>;
  }

  const onSubmit = (data: any) => {
    addPostMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="form-control">
        <span className="label-text">Title</span>
        <input
          type="text"
          {...register("title")}
          className="input input-bordered w-full"
          required
        />
      </label>

      <label className="form-control">
        <span className="label-text">Content</span>
        <textarea
          {...register("content")}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
      </label>

      <div className="flex justify-end gap-2">
        <button type="button" className="btn" onClick={closeModal}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
