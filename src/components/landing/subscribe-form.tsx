'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useToast} from "@/components/ui/use-toast";
import {useRequest} from "@/lib/hooks/useRequest";
import React, {useState} from "react";
import {Loader2, UserCheck} from "lucide-react";

const formSchema = z.object({
    email: z.string().email().min(2).max(255),
});

function SubscribeForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    });

    const {toast} = useToast();
    const {post} = useRequest();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState(false);

    function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);
        post("/subscribe", values)
            .then(() => {
                toast({
                    title: "Ви підписалися!",
                });
                setSubmitted(true);
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Не вийшло підписатися",
                    description: (err as Error).message,
                });
            })
            .finally(() => setSubmitting(false));
    }

    if (submitted) {
        return (
            <div className="flex items-center justify-center w-full gap-2">
                <UserCheck color="#618B7B" />
                <p>Ви успішно підписалися!</p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="max-w-lg flex-1">
                            <FormControl>
                                <Input type="email" placeholder="Введіть свою електронну адресу" {...field} />
                            </FormControl>
                            <FormMessage className="text-left ml-0.5" />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Підписатися
                </Button>
            </form>
        </Form>
    );
}

export default SubscribeForm;