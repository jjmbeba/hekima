import React from 'react'
import OnboardingForm from "@/components/forms/OnboardingForm";

const Page = () => {
    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
                Finish Onboarding
            </h1>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <OnboardingForm/>
            </div>
        </div>
    )
}
export default Page