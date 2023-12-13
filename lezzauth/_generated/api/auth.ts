import { API } from "./config"

export async function signIn({ email }: { email: string }) {
    return await API.post('/sign-in', { email })
}

export async function signInAttempt({ password }: { password: string }) {
    return await API.post('/sign-in/attempt', { password })
}