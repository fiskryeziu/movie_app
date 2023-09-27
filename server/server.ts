import cors from 'cors';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';

import { appRouter } from './router/root';
import { createContext } from './lib/context';
import { auth } from 'express-openid-connect'

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:5000/',
    clientID: '12w855W4f9nTZwXF3zM7bUtDR4XRAfFm',
    issuerBaseURL: 'https://dev-2z3k3lo1bzdmdwz5.us.auth0.com'
};

const app = express();

app.use(cors());

app.use(auth(config));

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.listen(5000);

export type AppRouter = typeof appRouter;