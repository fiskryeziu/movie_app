import { z } from 'zod';

import { router, publicProcedure, privateProcedure } from '../lib/trpc';


export const movieRouter = router({
    getMovies: publicProcedure.query(async ({ ctx }) => {
        const movies = await ctx.prisma.movie.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        })

        return movies

    }),
    getMovieById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const movie = await ctx.prisma.movie.findUnique({
                where:
                {
                    id: input.id
                }
            })

            return movie
        })
    ,
});