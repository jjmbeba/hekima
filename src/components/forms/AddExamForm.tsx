"use client";

import { addExamSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addNewExam } from "../exams/actions";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import dayjs from "dayjs";
import { CalendarIcon, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
const AddExamForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof addExamSchema>>({
    resolver: zodResolver(addExamSchema),
    defaultValues: {
      subject: "",
    },
  });

  const { mutate, isPending: isAddExamPending } = useMutation({
    mutationKey: ["exams"],
    mutationFn: async (values: z.infer<typeof addExamSchema>) => {
      const data = await addNewExam(values);

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`Exam added successfully`);
      router.refresh();
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof addExamSchema>) {
    mutate(values);
  }

  const examTypes = [
    {
      name: "Opening Term",
      value: "opening-term",
    },
    {
      name: "Mid Term",
      value: "mid-term",
    },
    {
      name: "End Term",
      value: "end-term",
    },
    {
      name: "Cat I",
      value: "cat-1",
    },
    {
      name: "Cat II",
      value: "cat-2",
    },
  ];

  const examPeriods = [
    {
      name: "First Term",
      value: "first-term",
    },
    {
      name: "Second Term",
      value: "second-term",
    },
    {
      name: "Third Term",
      value: "third-term",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Mathematics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center *:w-1/2 gap-2">
          <FormField
            control={form.control}
            name="examType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exam type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {examTypes.map(({ name, value }) => (
                      <SelectItem key={value} value={value}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Period</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exam period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {examPeriods.map(({ name, value }) => (
                      <SelectItem key={value} value={value}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        dayjs(field.value).format("ddd, D MMM YYYY")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isAddExamPending}>
          {isAddExamPending && <Loader className="h-4 w-4 animate-spin mr-2" />}
          Add exam
        </Button>
      </form>
    </Form>
  );
};

export default AddExamForm;
