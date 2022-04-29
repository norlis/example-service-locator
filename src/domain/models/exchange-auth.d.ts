export type ExchangeAuthIn = {
    provider: string
    username: string
    password: string
}

export type ExchangeAuthOut = {
    readonly accessToken: string
    readonly refreshToken: string
}

