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
    getMostPopularMovies: publicProcedure.query(async ({ ctx }) => {
        const movies = await ctx.prisma.movie.findMany({
            where: {
                viewCount: {
                    gt: 20,
                },
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        return movies
    }),
    getMostRatedMovies: publicProcedure.query(async ({ ctx }) => {
        const movies = await ctx.prisma.movie.findMany({
            orderBy: {
                rating: 'desc'
            }
        })
        return movies
    }),
    getMoviesByGenre: publicProcedure.input(z.object({ genre: z.string() })).query(async ({ ctx, input }) => {
        const movies = await ctx.prisma.movie.findMany({
            where: {
                genre: {
                    has: input.genre
                }
            }
        })

        return movies
    }),


    getMovieById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const movie = await ctx.prisma.movie.findUnique({
                    where: { id: input.id },
                    include: {
                        reviews: true,
                    },
                });

                if (movie) {
                    return movie;
                } else {
                    throw new Error("Movie not found");
                }
            } catch (error) {
                console.error("Error fetching movie:", error);
                throw new Error("Error fetching movie");
            }
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

        }),

    addCommentByMovieId: privateProcedure
        .input(z.object({ movieId: z.string(), comment: z.string() }))
        .mutation(async ({ ctx, input }) => {


            await ctx.prisma.movie.update({
                where: {
                    id: input.movieId
                },
                data: {
                    reviews: {
                        create: {
                            comment: input.comment,
                            name: ctx.user.username,
                            userId: ctx.user.id,
                        }
                    }
                }
            })

        }),
    getCommentsByMovieId: publicProcedure
        .input(z.object({ movieId: z.string() }))
        .query(async ({ ctx, input }) => {
            const reviews = await ctx.prisma.movie.findUnique({
                where: {
                    id: input.movieId
                },
                select: {
                    reviews: true
                }
            })
            return reviews
        }),
    //Admin 
    getAllMovies: privateProcedure.query(async ({ ctx }) => {
        const movies = await ctx.prisma.movie.findMany({
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                title: true,
                releaseDate: true,
            }
        })
        return movies
    }),

    addMovie: privateProcedure
        .input(z.object({
            title: z.string().min(2, {
                message: "title must be at least 2 characters.",
            }),
            description: z.string().min(2, {
                message: "Description must be at least 2 characters.",
            }),
            quality: z.string().min(2, {
                message: "Quality must be selected",
            }),
            genre: z.array(z.string()).default([]),
            rating: z.number(),
            releaseDate: z.coerce.date(),
            actors: z.array(z.string()).default([]),
            coverImageUrl: z.string(),
            movieURL: z
                .string()
                .startsWith("https://", { message: "Must provide secure URL" }),
            trailerUrl: z
                .string()
                .startsWith("https://", { message: "Must provide secure URL" }),
            duration: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.movie.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        quality: input.quality,
                        genre: input.genre,
                        rating: input.rating,
                        actors: input.actors,
                        coverImageUrl: input.coverImageUrl,
                        movieURL: input.movieURL,
                        trailerUrl: input.trailerUrl,
                        duration: input.duration,
                        releaseDate: input.releaseDate
                    },
                });
                return { status: 'success' };
            } catch (error) {
                throw new Error("Failed to add movie.");
            }

        }),
    //Admin 
    getDashboardInfo: privateProcedure.query(async ({ ctx }) => {
        const movies = await ctx.prisma.movie.count()
        const user = await ctx.prisma.user.count()
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const todaysComments = await ctx.prisma.review.count(
            {
                where: {
                    timestamp: {
                        gte: start,
                        lt: end
                    }
                }
            }
        )


        return { movies, user, todaysComments }
    }),
    editMovie: privateProcedure
        .input(z.object({
            id: z.string(),
            title: z.string().min(2, {
                message: "title must be at least 2 characters.",
            }),
            description: z.string().min(2, {
                message: "Description must be at least 2 characters.",
            }),
            quality: z.string().min(2, {
                message: "Quality must be selected",
            }),
            genre: z.array(z.string()).default([]),
            rating: z.number(),
            releaseDate: z.coerce.date(),
            actors: z.array(z.string()).default([]),
            coverImageUrl: z.string(),
            movieURL: z
                .string()
                .startsWith("https://", { message: "Must provide secure URL" }),
            trailerUrl: z
                .string()
                .startsWith("https://", { message: "Must provide secure URL" }),
            duration: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.movie.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        title: input.title,
                        description: input.description,
                        quality: input.quality,
                        genre: input.genre,
                        rating: input.rating,
                        actors: input.actors,
                        coverImageUrl: input.coverImageUrl,
                        movieURL: input.movieURL,
                        trailerUrl: input.trailerUrl,
                        duration: input.duration,
                        releaseDate: input.releaseDate
                    },
                });
                return { status: 'success' };
            } catch (error) {
                throw new Error("Failed to add movie.");
            }

        }),
    deleteMovie: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        await ctx.prisma.movie.delete({
            where: {
                id: input.id
            }
        })
    })


});