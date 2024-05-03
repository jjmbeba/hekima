"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signup } from "@/app/(auth)/actions";
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
import { signupSchema } from "@/lib/schemas";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import GoogleIcon from "../common/icons/GoogleIcon";
import { redirect } from "next/navigation";

const SignupForm = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signUp, isPending: isSignupPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (values: z.infer<typeof signupSchema>) => signup(values),
    onSuccess: () => {
      toast.success("User account created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: startGoogleSignIn, isPending } = useMutation({
    mutationKey: ["google-signup"],
    mutationFn: async () => {
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
    },
    onMutate: () => {
      toast(
        <div className="flex items-center">
          <Loader className="mr-2 h-4 w-4 animate-spin" /> Loading Google Sign
          in
        </div>,
        {
          id: "google-sign-in",
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss("google-sign-in");
    },
    onSuccess: () => {
      redirect("/dashboard");
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    signUp(values);
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
        <div className="flex items-center gap-2">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="secret-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSignupPending}>
          {isSignupPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Get Started
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-3"
          onClick={() => startGoogleSignIn()}
        >
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Get started with Google
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
