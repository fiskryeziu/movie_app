import { initTRPC, inferAsyncReturnType, TRPCError } from '@trpc/server';

import { createContext } from './context';

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;


const isAuthed = t.middleware(({ ctx, next }) => {

    const { req, res } = ctx
    if (!ctx.req.oidc.isAuthenticated()) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const session = req.oidc.isAuthenticated() ? 'authenticated' : 'notauthenticated'
    const user = req.oidc.user

    return next({
        ctx:
        {
            session,
            user
        }
    })
})
/**
 * Public procedures
 **/
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);