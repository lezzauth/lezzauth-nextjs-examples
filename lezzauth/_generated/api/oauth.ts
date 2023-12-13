import { API } from "./config"

export async function google() {
    window.location.replace(
        `${API.defaults.baseURL}/auth/google?redirectTo=${window.location.origin}/`
    );
}