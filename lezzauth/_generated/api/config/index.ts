import axios from 'axios';

export function getApplicationUrl(publishableKey: string): string {
    let key = "";

    if (publishableKey.includes("pk_test_") || publishableKey.includes("pk_live_")) {
        key = publishableKey.split("pk_test_")[1] || publishableKey.split("pk_live_")[1];
    }

    return atob(key);
}

const publishableKey = process.env.NEXT_PUBLIC_LEZZAUTH_PUBLISHABLE_KEY!;
const baseURL = getApplicationUrl(publishableKey)

export const API = axios.create({ baseURL })