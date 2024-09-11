import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {invalidEmail, validationMax, validationMin} from "@/lib/messages/form-validation";
import axios from "axios";
import {Loader2} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {signIn} from "next-auth/react";

const formSchema = z.object({
    name: z.string().min(2, validationMin(2, 'Ім\'я')).max(255, validationMax(255, 'Ім\'я')),
    email: z.string().email(invalidEmail).min(2, validationMin(2, 'Електрона адреса')).max(255, validationMax(255, 'Електрона адреса')),
    password: z.string().min(2, validationMin(2, 'Пароль')).max(255, validationMax(255, 'Пароль')),
    passwordConfirm: z.string()
})
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Паролі не співпадають",
        path: ['passwordConfirm']
    });

function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const [submitting, setSubmitting] = useState(false);
    const [errorStatus, setErrorStatus] = useState<number | undefined>();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);
        axios.post('/api/auth/register', values)
            .then(() => signIn('credentials', values))
            .catch(err => setErrorStatus(err.status))
            .finally(() => setSubmitting(false));
    }

    return (
        <Form {...form}>
            {errorStatus && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Помилка авторизації!</AlertTitle>
                    <AlertDescription>
                        {errorStatus === 400 && 'Будь ласка, заповніть всі поля.'}
                        {errorStatus === 422 && 'Користувач з такою поштою вже існує.'}
                    </AlertDescription>
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
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <Label htmlFor="register-name">Ім&apos;я</Label>
                                <FormControl>
                                    <Input
                                        id="register-name"
                                        type="text"
                                        placeholder="Іван Мельник"
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

                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({field}) => (
                            <FormItem>
                                <Label htmlFor="register-confirm">Підтвердження паролю</Label>
                                <FormControl>
                                    <Input
                                        id="register-confirm"
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
                        <p>Зареєструватися</p>
                    </span>
                </Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
