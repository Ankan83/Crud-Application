import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { schema, FormData } from "@/schema/formSchema";
import { updatePost } from "@/utils/updatePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Posts, PostWithoutUserID } from "@/types/posts";

type Props = {
  editingPost: PostWithoutUserID;
  setEditingPost: React.Dispatch<
    React.SetStateAction<null | PostWithoutUserID>
  >;
  handleSuccessBanner: () => void;
  updatePostList: (data: Posts) => void;
};

export default function UpdatePostForm({
  editingPost,
  setEditingPost,
  handleSuccessBanner,
  updatePostList,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data: Posts) => {
      updatePostList(data);
      handleSuccessBanner();
      reset();
      setEditingPost(null);
    },
  });

  const onSubmit = (data: FormData) => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, ...data });
    }
  };

  useEffect(() => {
    reset(editingPost);
  }, [editingPost]);

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-semibold mb-2">Edit Post</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          className="input input-bordered w-full"
          placeholder="Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <textarea
          {...register("body")}
          className="textarea textarea-bordered w-full"
          placeholder="Body"
        />
        {errors.body && (
          <p className="text-red-500 text-sm">{errors.body.message}</p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => reset(editingPost)}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditingPost(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
