"use client";

import { FormData } from "@/schema/formSchema";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type Props = {
  addPostMutation: UseMutateFunction<
    object,
    Error,
    {
      title: string;
      body: string;
    },
    unknown
  >;
  closeModal: () => void;
};

export default function AddPostForm({ addPostMutation, closeModal }: Props) {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: { title: string; body: string }) => {
    addPostMutation(data);
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
          {...register("body")}
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
