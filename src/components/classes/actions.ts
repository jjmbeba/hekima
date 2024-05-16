"use server";

import { addClassSchema, editClassSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function fetchAllClasses() {
  const supabase = createClient();

  const { data, error } = await supabase.from("classes").select("*");

  if (error) throw new Error(error.message);

  return data;
}

export async function addNewClass(newClass: z.infer<typeof addClassSchema>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("classes")
    .insert([
      {
        ...newClass,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data[0];
}

export async function deleteClass(classID: number) {
  const supabase = createClient();

  const { error } = await supabase.from("classes").delete().eq("id", classID);

  if (error) throw new Error(error.message);

  return;
}

export async function editClass(edittedClass: z.infer<typeof editClassSchema>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("classes")
    .update({ ...edittedClass })
    .eq("id", edittedClass.id)
    .select();

  if (error) throw new Error(error.message);

  return data[0];
}