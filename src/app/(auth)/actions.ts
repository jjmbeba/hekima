"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/lib/schemas";

export async function login(formData: z.infer<typeof loginSchema>) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) throw new Error(error.message);

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function signup(formData: z.infer<typeof signupSchema>) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
