import { z } from 'zod';

import { router, publicProcedure, privateProcedure } from '../lib/trpc';

import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticatedRequest } from '../types';
import generateToken from '../utils/generateToken';


export const userRouter = router({
    login: publicProcedure
        .input(z.object({ email: z.string().email(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { req, res } = ctx;

            const { email, password } = input;

            const user = await ctx.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Invalid password' });
            }

            const tokenData = {
                id: user.id,
                role: user.role
            }

            const token = generateToken(tokenData);


            (req as AuthenticatedRequest).user = {
                id: user.id,
                username: user.username,
            };


            let data = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                token,
            }
            return {
                data
            };
        })
    ,
    register: publicProcedure
        .input(z.object({ email: z.string().email(), password: z.string(), username: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { req } = ctx;

            const { email, password, username } = input;

            const existingUser = await ctx.prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'This email is already registered. Please use a different email.',
                });
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const newUser = await ctx.prisma.user.create({
                data: {
                    email,
                    password: passwordHash,
                    username,
                },
            });


            (req as AuthenticatedRequest).user = {
                id: newUser.id,
                username: newUser.username,
            };

            return {
                message: 'Registration successful!',

            };
        }),
    changeUsername: privateProcedure
        .input(z.object({ username: z.string() }))
        .mutation(async ({ ctx, input }) => {

            const token = ctx.user.token
            const user = await ctx.prisma.user.update({
                where: {
                    id: ctx.user.id
                },
                data: {
                    username: input.username
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    role: true,
                    createdAt: true,
                },


            })

            return { ...user, token }

        }),
    getUsers: privateProcedure.query(async ({ ctx }) => {
        const users = await ctx.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                password: false,
            }
        })

        return users
    }),

    // admin 
    updateUser: privateProcedure
        .input(z.object({
            id: z.string(),
            username: z.string(),
            email: z.string().email(),
            role: z.enum(['ADMIN', 'USER'])
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    username: input.username,
                    email: input.email,
                    role: input.role
                }
            })
        }),
    deleteUser: privateProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.user.delete({
                where: {
                    id: input.id,
                },
            })
        })
});