import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import RedditProvider from "next-auth/providers/reddit";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            authorization: {
                params: {
                    duration: "permanent",
                },
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string
        })
    ]
}
