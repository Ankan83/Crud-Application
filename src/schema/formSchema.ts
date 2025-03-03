import { z } from "zod";

export const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  body: z.string().min(10, "Body must be at least 10 characters"),
});

export type FormData = z.infer<typeof schema>;