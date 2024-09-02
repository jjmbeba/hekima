"use server";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {z} from "zod";
import {onBoardingFormSchema} from "@/components/schemas";
import {prisma} from "@/prisma";
import {redirect} from "next/navigation";

export const completeOnboarding = async (values: z.infer<typeof onBoardingFormSchema>) => {
    const {userId} = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    try {
        await prisma.profile.create({
            data: {
                id: userId,
                fullName: values.fullName,
                role: values.accountType
            }
        });

        await clerkClient().users.updateUser(userId, {
            publicMetadata: {
                onboardingComplete: true
            }
        })

        redirect("/dashboard");
    } catch (error) {
        throw new Error("Failed to complete onboarding");
    }
}