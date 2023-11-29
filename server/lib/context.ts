import * as trpcExpress from '@trpc/server/adapters/express';
import { prisma } from '../lib/prismaClient'

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {

    return { req, res, prisma };
};