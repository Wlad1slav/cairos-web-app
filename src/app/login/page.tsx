'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import SignInWithGoogle from "@/components/buttons/signInGoogle";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function LoginPage() {

    const {data: session} = useSession();

    if (session) {
        redirect("/profile");
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
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
                            <div className="space-y-1">
                                <Label htmlFor="signin-email">Email</Label>
                                <Input id="signin-email" type="email" placeholder="m@example.com"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="signin-password">Пароль</Label>
                                <Input id="signin-password" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Увійти</Button>
                        </CardFooter>
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
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="register-email">Email</Label>
                                <Input id="register-email" type="email" placeholder="m@example.com"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="register-name">Ім&apos;я</Label>
                                <Input id="register-name" placeholder="Іван Мельник"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="register-password">Пароль</Label>
                                <Input id="register-password" type="password"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="register-confirm-password">Підтвердьте пароль</Label>
                                <Input id="register-confirm-password" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Зареєструватися</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <div className="mt-4">
                    <SignInWithGoogle/>
                </div>
            </Tabs>
        </main>
    )
}
