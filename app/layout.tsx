"use client"

import { LezzAuthProvider } from "lezzauth/nextjs";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <LezzAuthProvider publishableKey={process.env.NEXT_PUBLIC_LEZZAUTH_PUBLISHABLE_KEY!}>
        <body>{children}</body>
      </LezzAuthProvider>
    </html>
  );
}
