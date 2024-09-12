import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from 'bcryptjs';
import User from "@/lib/models/user.schema";

export const maxAccountsAmount = 3;

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                name: {label: 'Name', type: 'text'}, // This field is used only during registration
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {

                // Search for a user in the database
                const user = await User.findOne({email: credentials?.email});

                if (user && credentials?.password) {
                    // Password verification
                    const isValidPassword = await compare(credentials.password, user.password);

                    if (isValidPassword) {
                        return {id: user._id, email: user.email, name: user.name, image: user.image};
                    }
                }

                // If the user does not exist or the password is incorrect
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({session, token}) {
            if (session && session.user) {
                const user = await User.findOne({email: token.email});

                session.user.email = token.email;
                session.user.name = token.name;
                if (user && user.image) {
                    session.user.image = user.image
                }
            }
            return session;
        },
    },
}
