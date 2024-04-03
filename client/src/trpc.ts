import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

import type { AppRouter } from '../../server/server';


export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:5000/trpc',
            async headers() {
                const storedUserInfo = localStorage.getItem("userInfo")
                const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

                return {
                    authorization: parsedUserInfo ? `Bearer ${parsedUserInfo.token}` : '',
                };
            },
        }),

    ],
});