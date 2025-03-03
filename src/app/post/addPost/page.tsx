"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  title: z.string().min(5).trim(),
  body: z.string().min(5).trim(),
});

type Schema = z.infer<typeof schema>;

export default function AddPost() {
  const [error, setError] = useState<string[]>([]);

  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    setError([]);
    console.log(data);
  };
  const onSubmitError = (err) => {
    setError(() =>
      Object.keys(err).map(
        (errorField) => `${errorField}: ${err[errorField].message}`
      )
    );
  };

  const mutation = useMutation({
    mutationFn: async (formData: Schema) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            userId: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Post Created:", data);
      alert("Post submitted successfully!");
    },
    onError: (error) => {
      console.error("Error submitting post:", error);
      alert("Failed to submit post.");
    },
  });
  return (
    <>
      <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <div>
            <input
              {...register("title")}
              placeholder="Title"
              className="input input-bordered w-full"
            />
            {error.title && (
              <p className="text-red-500 text-sm">{error.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("body")}
              placeholder="Body"
              className="textarea textarea-bordered w-full"
            />
            {error.body && (
              <p className="text-red-500 text-sm">{error.body.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
