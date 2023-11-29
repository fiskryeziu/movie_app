import cors from 'cors';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router/root';
import { createContext } from './lib/context';
import generateToken from './utils/generateToken';
import bcrypt from 'bcrypt'

const app = express();

app.use(cors());

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);
app.get('/', (req, res) => {
    const a = generateToken('9d1fd6e6-9130-4bce-abae-57eec9a1bac4')

    res.send()
})

const getPass = async () => {

    const saltRounds = 10;

    const password = await bcrypt.hash('1234', saltRounds);
    console.log(password);
}
getPass()


app.listen(5000);

export type AppRouter = typeof appRouter;

function password() {
    throw new Error('Function not implemented.');
}
