import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(8).max(255),
});

export const registerFormSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(8).max(255),
  username: z.string().min(2).max(255),
});
