'use client'

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {invalidEmail} from "@/lib/messages/form-validation";
import {signIn} from "next-auth/react";
import {Loader2} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

const formSchema = z.object({
    email: z.string().email(invalidEmail),
    password: z.string(),
});

function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [submitting, setSubmitting] = useState(false);

    const searchParams = useSearchParams();
    const [error] = useState<string | null | undefined>(searchParams.get('error'));

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);
        signIn('credentials', values)
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <Form {...form}>
            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Помилка авторизації!</AlertTitle>
                    <AlertDescription>{error === 'CredentialsSignin' ? 'Невірна пошта або пароль' : 'Невідома помилка при авторизації'}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <Label htmlFor="register-email">Email</Label>
                                <FormControl>
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="m@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <Label htmlFor="register-password">Пароль</Label>
                                <FormControl>
                                    <Input
                                        id="register-password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                    <span className="inside-button">
                        {submitting && <Loader2 className="animate-spin"/>}
                        <p>Увійти</p>
                    </span>
                </Button>

            </form>
        </Form>
    );
}

export default LoginForm;
