import {z} from "zod";

export const onBoardingFormSchema = z.object({
    accountType : z.string({
        required_error:"Account type is required"
    }),
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters"
    }),
});