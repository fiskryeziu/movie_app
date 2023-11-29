import { z } from 'zod';

import { router, publicProcedure, privateProcedure } from '../lib/trpc';

import { prisma } from '../lib/prismaClient';
import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AuthenticatedRequest } from '../types';


export const userRouter = router({
    login: publicProcedure
        .input(z.object({ email: z.string().email(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { req } = ctx;

            const { email, password } = input;

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user.id }, 'secret1234', { expiresIn: '1h' });

            (req as AuthenticatedRequest).user = {
                id: user.id,
                username: user.username,
            };

            let data = {
                id: user.id,
                username: user.username,
                email: user.email,
                token,
            }

            console.log(data);
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

            const existingUser = await prisma.user.findUnique({
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

            const newUser = await prisma.user.create({
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
        })
    ,
});