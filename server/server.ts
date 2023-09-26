import cors from 'cors';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';

import { appRouter } from './router/root';
import { createContext } from './lib/context';

const app = express();

app.use(cors());

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.listen(5000);

export type AppRouter = typeof appRouter;