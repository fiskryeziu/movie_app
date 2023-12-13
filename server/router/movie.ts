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

    incrementView: publicProcedure
        .input(z.object({ movieId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.movie.update({
                where: {
                    id: input.movieId
                },
                data: {
                    viewCount: {
                        increment: 1
                    }
                }

            })

        })
    // TODO: movie view counter functionality
    // so we can use to get popular.tsx page movies
    // the view counter will get called after 3 seconds of watching 


    // TODO: watched movies for the user
    // api gets called after 30s of watching the movie
    // the data will be saved in user watchedList field 
});