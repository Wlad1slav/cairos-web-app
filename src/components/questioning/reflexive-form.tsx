"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Textarea} from "@/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import {useRequest} from "@/lib/hooks/useRequest";
import {isImageURL} from "@/lib/utils";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    text: z.string().min(2).max(1000),
    imageUrl: z.string()
        .min(2)
        .max(255)
        .url()
        .refine((value) => {
            return isImageURL(value);
        }, {
            message: "URL повинен вести напряму до зображення",
        }),
    day: z.number().gte(0).lte(6),
    type: z.enum(['Цитата', 'Питання', 'Дія']) //z.string().min(2).max(255),
});

function rForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
            imageUrl: "",
            day: 0,
            type: 'Цитата'
        },
    });

    const {post} = useRequest();
    const {toast} = useToast();
    const router = useRouter();

    function onSubmit(values: z.infer<typeof formSchema>) {
        post("/admin/reflexive", values)
            .then(() => {
                toast({
                    title: `${values.type} збережено`,
                });
                router.back();
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: `Помилка при збереженні рефлексії "${values.type}"`,
                    description: (err as Error).message,
                });
            });
    }

    return (
        <Form {...form}>

            {/* https://i.postimg.cc/vTwY6hFz/DALL-E-2024-09-04-13-34-42-A-person-standing-on-a-mountaintop-at-sunrise-with-arms-outstretched.webp */}

            <div className="flex justify-center">
                { isImageURL(form.control._formValues['imageUrl']) && (
                    <Image
                        src={form.control._formValues['imageUrl']}
                        alt={''}
                        className="mb-4 rounded"
                        width={640/2} height={480/2}
                        onError={(e) => {
                            (e.target as HTMLImageElement).srcset = 'https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725408000&semt=ais_hybrid';
                        }}
                    />
                ) }
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Тип рефлексії</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Вибери тип рефлексії" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Цитата">Цитата</SelectItem>
                                    <SelectItem value="Питання">Питання</SelectItem>
                                    <SelectItem value="Дія">Дія</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Текст</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Лінк на зображення</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="https://i.postimg.cc/vTwY6hFz/image.webp" {...field} />
                            </FormControl>
                            <FormDescription>
                                Завантажувати зображення сюди: <Link href={'https://postimg.cc/'}>https://postimg.cc/</Link>. Після чого додавати в поле посилання на зображення.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>День тижню</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Вибери день тижню" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Понеділок</SelectItem>
                                    <SelectItem value="2">Вівторок</SelectItem>
                                    <SelectItem value="3">Середа</SelectItem>
                                    <SelectItem value="4">Четвер</SelectItem>
                                    <SelectItem value="5">П&apos;ятниця</SelectItem>
                                    <SelectItem value="6">Субота</SelectItem>
                                    <SelectItem value="0">Неділя</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                День тижню, коли це буде доступно для користувача
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Зберегти</Button>
            </form>
        </Form>
    );
}

export default ReflexiveForm;