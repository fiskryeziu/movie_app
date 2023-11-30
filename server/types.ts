export interface AuthenticatedRequest extends Express.Request {
    user?: {
        id: string;
        username: string;
    };
}

export type DecodeProps = {
    userId: string,
    iat: number,
    exp: number
}

export type UserProps = {
    userId: string,
    username: string,
    email: string,
    role: 'ADMIN' | 'USER' | '',
}

