"use server";
import { addEventSchema, editEventSchema } from "@/lib/schemas";
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

export async function deleteEvent(eventID: number) {
  const supabase = createClient();

  const { error } = await supabase.from("events").delete().eq("id", eventID);

  if (error) throw new Error(error.message);

  return;
}

export async function editEvent(edittedEvent: z.infer<typeof editEventSchema>) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .update({ ...edittedEvent })
    .eq("id", edittedEvent.id)
    .select();

  if (error) throw new Error(error.message);

  return data[0];
}

export async function fetchSingleEvent(id: number) {
  const supabase = createClient();

  const { error, data } = await supabase
    .from("events")
    .select("*")
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data[0];
}
