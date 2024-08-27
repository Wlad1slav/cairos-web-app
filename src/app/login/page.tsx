'use client'

import {Button} from "@/components/ui/button";
import Image from "next/image";
import './style.scss';
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

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
            <div className="login-container">
                <h1>Авторизація</h1>
                <div className="login-container--greeting">
                    <p>Вітаємо тебе, Великий лицаре правди</p>
                    <Button variant="outline" onClick={() => signIn('google')}>
                        <div className="inside-button">
                            <Image
                                src="/assets/images/Google__G__logo.svg.webp"
                                alt="google logo"
                                width={24}
                                height={24}
                            />
                            <p>Увійти з Google</p>
                        </div>
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default LoginPage;