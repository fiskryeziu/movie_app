export interface AuthenticatedRequest extends Express.Request {
    user?: {
        id: string;
        username: string;
    };
}


