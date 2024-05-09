"use server";
import { addEventSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function addEvent({
  name,
  location,
  type,
  date,
  description,
}: z.infer<typeof addEventSchema>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        name,
        type,
        location,
        description,
        date,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data[0];
}
