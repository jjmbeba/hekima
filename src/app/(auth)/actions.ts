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
  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  redirect("/");
}

export async function signup(formData: z.infer<typeof signupSchema>) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) throw new Error(error.message);

  redirect("/dashboard");
}

export async function signInWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) throw new Error(error.message);
}

export async function checkIfUserIsAdmin() {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  if (!user.user) throw new Error("User is unauthorized");

  const { data, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.user.id);


  if (!data) throw new Error("User not found");

  return data?.[0].is_admin;
}
