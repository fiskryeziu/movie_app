import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server';

import { createContext } from './context';

import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthenticatedRequest } from '../types';
import { prisma } from './prismaClient';


export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;


const isAuthed = t.middleware(async ({ ctx, next }) => {
    const { req } = ctx
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' })

    try {
        const payload = jwt.verify(token, 'secret1234') as JwtPayload

        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                username: true,
                password: false
            }
        });

        if (!user) {
            throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'user not found' });
        }

        (req as AuthenticatedRequest).user = user;

        return next({
            ctx:
            {
                payload,
                user: { ...user, token }
            }
        })
    }
    catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)

        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message });
    }
})
/**
 * Public procedures
 **/
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);