import { router } from '../lib/trpc';
import { movieRouter } from './movie';
import { userRouter } from './user';

export const appRouter = router({
    user: userRouter,
    movie: movieRouter
});

export type AppRouter = typeof appRouter;