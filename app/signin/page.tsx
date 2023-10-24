"use client"

import { SignIn } from '@lezzauth/nextjs'

export default function Page() {
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <SignIn />
        </div>
    )
}