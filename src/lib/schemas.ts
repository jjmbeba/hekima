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

export const addEventSchema = z.object({
  name: z.string().min(2, {
    message: "Name should be at least 2 characters",
  }),
  description: z.string().min(2, {
    message: "Description should be at least 2 characters",
  }),
  type: z.enum(["mandatory", "optional"]),
  location: z.string().min(2, {
    message: "Location should be at least 2 characters",
  }),
  date: z.date(),
});

export const editEventSchema = addEventSchema.extend({
  id: z.number(),
});

export const addClassSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
});

export const editClassSchema = addClassSchema.extend({
  id: z.number(),
});

export const addExamSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject name must be atleast 2 characters",
  }),
  examType: z.enum(["opening-term", "mid-term", "end-term", "cat-1", "cat-2"], {
    required_error: "Exam type is required",
  }),
  examPeriod: z.enum(["first-term", "second-term", "third-term"], {
    required_error: "Exam period is required",
  }),
  date: z.date({
    required_error: "Date is required",
  }),
  grade: z.string({
    required_error: "Grade is required",
  }),
});

export const editExamSchema = addExamSchema.extend({
  id: z.number(),
});
