# Installation

1. Clone this repository 

```bash
git clone https://github.com/lezzauth/lezzauth-nextjs-examples.git
```

2. Install the package
```bash
yarn
```

or this :
```bash
npm i
```

# Setup
1. Install lezzauth :
```bash
yarn add git+https://github.com/lezzauth/lezzauth.git
```
or, this
```bash
npm i git+https://github.com/lezzauth/lezzauth.git
```

2. Set up your `.env` or `.env.local` :
```env
# GET IT FROM OUR PLATFORM : https://staging.lezzauth.com

NEXT_PUBLIC_LEZZAUTH_PUBLISHABLE_KEY=
LEZZAUTH_SECRET_KEY=
```

3. Run this in your terminal, login with your account platform :
```bash
npx lezzauth login
```

4. Run this to generate the component :
```bash
npx lezzauth dev
```

5. Edit your `layout.tsx` file or other nextjs root file, mine look like this : 
```ts
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
```

Inside `globals.css` mine look like this :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Open `next.config.js` and add this :
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["lezzauth"] // add this
}

module.exports = nextConfig
```


# Run your NextJS project ✨

```bash
yarn dev
```
or, this

```bash
npm run dev
```

# Partial

You can also custom per partial component, for example :

## SignIn Partial

```ts
"use client"

import { EmailInput, EmailLabel, PasswordInput, PasswordLabel, Button as SignInButton, SignInContainer, SignInProvider } from "@/lezzauth/_generated/components/sign-in";

export default function Page() {
    return (
        <SignInProvider>
            <EmailLabel />
            <EmailInput className="border-2 border-black" /> // you can also style with tailwind (don't forget to import .globals.css or other file that load your tailwind) 

            <PasswordLabel />
            <PasswordInput style={{ border: "2px solid black" }} /> // you can also custom the style

            <SignInButton />
        </SignInProvider>
    )
}
```

## SignUp Partial

```ts
"use client"

import { EmailInput, EmailLabel, PasswordInput, PasswordLabel, Button as SignUpButton, SignUpContainer, SignUpProvider } from "@/lezzauth/_generated/components/sign-up";

export default function Page() {
    return (
        <SignUpProvider>
            <EmailLabel />
            <EmailInput />

            <PasswordLabel />
            <PasswordInput />

            <SignUpButton />
        </SignUpProvider >
    )
}
```