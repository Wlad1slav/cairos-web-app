'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import SignInWithGoogle from "@/components/buttons/signInGoogle";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import React from "react";
import RegisterForm from "@/components/auth/register-form";
import LoginForm from "@/components/auth/login-form";


export default function LoginPage() {

    const {data: session} = useSession();

    if (session) {
        redirect("/profile");
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-full">
            <Tabs defaultValue="signin" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Увійти</TabsTrigger>
                    <TabsTrigger value="register">Зареєструватися</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Увійти</CardTitle>
                            <CardDescription>
                                Введіть адресу електронної пошти та пароль, щоб увійти до свого облікового запису.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <LoginForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle>Зареєструватися</CardTitle>
                            <CardDescription>
                                Створіть новий обліковий запис, заповнивши форму нижче.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RegisterForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <div className="mt-4">
                    <SignInWithGoogle/>
                </div>
            </Tabs>
        </main>
    )
}
