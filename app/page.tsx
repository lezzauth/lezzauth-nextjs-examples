"use client"

import { SignedIn, SignedOut, useUser, SignOutButton, UserButton } from '@lezzauth/nextjs'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { user } = useUser()

  return (
    <div>
      <SignedIn>
        <div className='flex w-full justify-end p-5'>
          <UserButton />
        </div>
        <h1>Welcome back, <b> {`${user.firstName || ''} ${user.lastName || ''}`}</b></h1>
        <h2>Your id : {user.id}</h2>
        <h2>Your email : {user.email}</h2>
        <div className='flex flex-col w-[400px]'>
          <button className='p-5 rounded border-2' onClick={() => {
            router.push('/profile')
          }}>Edit your profile here!
          </button>
          <SignOutButton>
            SIGNOUT
          </SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <h1>You are not login</h1>
        <button onClick={() => {
          router.push('/signin')
        }}>Login here!</button>
      </SignedOut>
    </div>
  )
}
