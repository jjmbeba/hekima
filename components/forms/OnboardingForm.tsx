"use client";

import React from 'react'
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {onBoardingFormSchema} from "@/components/schemas";
import {z} from "zod";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useMutation} from "@tanstack/react-query";
import {completeOnboarding} from "@/actions";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Loader} from "lucide-react";

const OnboardingForm = () => {
    const form = useForm({
        resolver: zodResolver(onBoardingFormSchema),
        defaultValues:{
            accountType: "student",
            fullName:""
        }
    });

    const {mutate:onBoardUser, isPending:isOnboardingLoading} = useMutation({
        mutationKey:['onboarding'],
        mutationFn: async (values: z.infer<typeof onBoardingFormSchema>) => {
            await completeOnboarding(values);
        },
        onError:(error) => {
            toast.error(error.message);
        },
        onSettled:() => {
            form.reset();
        }
    })

    const onSubmit = (values: z.infer<typeof onBoardingFormSchema>) => {
        onBoardUser(values);
        // console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} className="w-full p-2 border border-gray-300 rounded-md"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an account type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                    <SelectItem value="parent">Parent</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isOnboardingLoading} className="w-full py-2 rounded-md hover:bg-blue-600">
                    {isOnboardingLoading && <Loader className="h-4 w-4 animate-spin mr-2" />}
                    Complete onboarding
                </Button>
            </form>
        </Form>
    )
}
export default OnboardingForm