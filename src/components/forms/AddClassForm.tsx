"use client";

import { addClassSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { addNewClass } from "../classes/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddClassForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof addClassSchema>>({
    resolver: zodResolver(addClassSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending: isAddClassPending } = useMutation({
    mutationKey: ["classes"],
    mutationFn: async (values: z.infer<typeof addClassSchema>) => {
      const data = await addNewClass(values);

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`Class '${data.name}' added successfully`);
      router.refresh();
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof addClassSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Grade 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isAddClassPending}>
          {isAddClassPending && (
            <Loader className="h-4 w-4 animate-spin mr-2" />
          )}
          Add class
        </Button>
      </form>
    </Form>
  );
};

export default AddClassForm;
