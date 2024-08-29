'use client'

import Image from "next/image";
import './style.scss';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import SignInGoogle from "@/components/buttons/signInGoogle";
import {Loader2} from "lucide-react";

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

            { session === undefined ? (
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="h-48 w-48 animate-spin"/>
                </div>
            ) : (
                <div className="login-container">
                    <h1>Авторизація</h1>
                    <div className="login-container--greeting">
                        <p>Вітаємо тебе, Великий лицаре правди</p>
                        <SignInGoogle/>
                    </div>
                </div>
            )}
        </main>
    );
}

export default LoginPage;