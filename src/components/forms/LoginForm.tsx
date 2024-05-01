"use client";

import { z } from "zod";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleIcon from "../common/icons/GoogleIcon";
import { loginSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/(auth)/actions";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (values: z.infer<typeof loginSchema>) => login(values),
    onError:(error) => {
      toast.error(error.message)
    }
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    loginUser(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="secret-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoginPending}>
          {isLoginPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Log in
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-3"
        >
          <GoogleIcon />
          Log In with Google
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
