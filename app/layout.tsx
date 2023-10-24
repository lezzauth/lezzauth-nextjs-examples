"use client"

import { LezzAuthProvider } from "@lezzauth/nextjs"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LezzAuthProvider publishableKey={process.env.NEXT_PUBLIC_LEZZAUTH_PUBLISHABLE_KEY as string}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </LezzAuthProvider>
  )
}
