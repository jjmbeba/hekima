'use client'
import {SignUp} from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className="grid w-full grow items-center px-4 h-screen justify-center">
            <SignUp/>
        </div>
    )
}