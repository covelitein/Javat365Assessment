import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(1, { message: "Please enter a value" }),
  email: z.string().email("Please a valid email"),
  password: z
    .string()
    .min(6, { message: "Password should 6 characters long or more" }),
});

export const signInSchema = z.object({
  email: z.string().email("Please a valid email"),
  password: z
    .string()
    .min(6, { message: "Password should 6 characters long or more" }),
});
