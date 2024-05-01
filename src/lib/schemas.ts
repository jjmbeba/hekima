import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email().min(1, "Email cannot be blank"),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password and confirm password must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email().min(1, "Email cannot be blank"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
