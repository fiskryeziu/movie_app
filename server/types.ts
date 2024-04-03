export interface AuthenticatedRequest extends Express.Request {
    user?: {
        id: string;
        username: string;
    };
}

export type TUser = {
    id: string,
    role: 'USER' | 'ADMIN'
}


