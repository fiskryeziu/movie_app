export type DecodeProps = {
    userId: string,
    iat: number,
    exp: number
}

export type UserProps = {
    id: string,
    username: string,
    email: string,
    role: 'ADMIN' | 'USER',
}
