'use client'

import Image from "next/image";
import './style.scss';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import SignInGoogle from "@/components/buttons/signInGoogle";
import {Loader2} from "lucide-react";
import SignInWithReddit from "@/components/buttons/reddit-auth";
import SignInWithFacebook from "@/components/buttons/facebook-auth";
import SignInWithLinkedin from "@/components/buttons/linkedin-auth";

function LoginPage() {
    const {data: session} = useSession();

    if (session) {
        redirect("/profile");
    }

    return (
        <main>
            <Image
                src="/assets/images/logo.png"
                alt="Cairos logo"
                width={800}
                height={200}
                className="logo"
            />

            {session === undefined ? (
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="h-48 w-48 animate-spin" color="orange"/>
                </div>
            ) : (
                <div className="login-container">
                    <h1>Авторизація</h1>
                    <div className="login-container--greeting">
                        <p>Вітаємо тебе, Великий лицаре правди</p>
                        <SignInGoogle/>
                        <SignInWithReddit/>
                        <SignInWithFacebook/>
                        <SignInWithLinkedin/>
                    </div>
                </div>
            )}
        </main>
    );
}

export default LoginPage;
