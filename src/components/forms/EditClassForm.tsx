"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tables } from "@/database-types";
import { editClassSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { editClass } from "../classes/actions";

const EditClassForm = ({
  cls,
  setEditMenuOpen,
}: {
  cls: Tables<"classes">;
  setEditMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof editClassSchema>>({
    resolver: zodResolver(editClassSchema),
    defaultValues: {
      ...cls
    },
  });

  const { mutate, isPending: isEditClassPending } = useMutation({
    mutationKey: ["classes"],
    mutationFn: async (values: z.infer<typeof editClassSchema>) => {
      const data = await editClass(values);

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (updatedClass) => {
      toast.success(`${updatedClass.name} updated successfully`);
      router.refresh();
      setEditMenuOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof editClassSchema>) {
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
                <Input placeholder="Opening day" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isEditClassPending}>
          {isEditClassPending && (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          )}
          Edit class
        </Button>
      </form>
    </Form>
  );
};

export default EditClassForm;