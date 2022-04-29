import {AuthRepository} from "../domain/auth-repository";
import {MARKETPLACE_BASE_URL} from "../config";

export const AuthService: AuthRepository = async ({payload: {username, password}}) => {

    const payload = {
        method: 'POST',
        body: JSON.stringify({email: username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await window.fetch(`${MARKETPLACE_BASE_URL}/api/auth/token`, payload)

    if (res.status !== 200)
        return Promise.reject(res.statusText)

    const data = await res.json() as {access: string, refresh: string}
    return {
        data: {accessToken: data.access, refreshToken: data.refresh}
    }
}