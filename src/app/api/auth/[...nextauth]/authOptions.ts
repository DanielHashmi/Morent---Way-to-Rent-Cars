import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import client from '../../../../sanity/lib/client'

export const authOption: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? ''
        })
    ],
    callbacks: {
        async signIn({ user }) {
            const { email, name, image } = user;
            const query = `*[_type == "user" && email == $email][0]`;
            const existingUser = await client.fetch(query, { email });
            if (!existingUser) {
                await client.create({
                    _type: 'user',
                    name,
                    email,
                    image,
                    role: email === process.env.ADMIN_EMAIL ? 'Admin' : 'User',
                });
            }

            return true;
        },
        async redirect({ baseUrl }) {
            return baseUrl
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60
    },
    secret: process.env.NEXT_AUTH_SECRET,
};
