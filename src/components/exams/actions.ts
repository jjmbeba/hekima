"use server";

import { addExamSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function fetchAllExams() {
  const supabase = createClient();

  const { data: exams, error } = await supabase.from("exams").select("*");

  if (error) throw new Error(error.message);

  return exams;
}

export async function addNewExam(newExam: z.infer<typeof addExamSchema>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exams")
    .insert([
      {
        ...newExam,
        grade: parseInt(newExam.grade),
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data[0];
}

export async function fetchSingleExam(examID: number) {
  const supabase = createClient();

  const { data: exam, error } = await supabase
    .from("exams")
    .select("*")
    .eq("id", examID);

  if (error) throw new Error(error.message);

  return exam[0];
}

export async function deleteExam(examID: number) {
  const supabase = createClient();

  const { error } = await supabase.from("exams").delete().eq("id", examID);

  if(error) throw new Error(error.message);

  return;
}
