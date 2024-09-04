'use client'

import {Skeleton} from "@/components/ui/skeleton";
import Checklist from "@/components/checklist";
import {cairosDaysTasks, staticItems} from "@/lib/constants";
import {Separator} from "@/components/ui/separator";
import {Form} from "@/components/ui/form";
import {useAuth} from "@/lib/hooks/useAuth";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import QuestionnaireNavButtons from "@/components/questionnaire/questionnaire-nav-buttons";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {useRequest} from "@/lib/hooks/useRequest";

const FormSchema = z.object({
    daily: z.array(z.string()),
    cairos: z.array(z.string()),
});

function Tasks({submitButton, afterSubmit}: {
    submitButton: 'questionnaire_navigation' | 'button';
    afterSubmit: () => void;
}) {

    const { profile } = useAuth();
    const {post} = useRequest();

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const today = new Date().setHours(0, 0, 0, 0);

    const [defaultValues, setDefaultValues] = useState<{
        daily: string[];
        cairos: string[];
    }>({
        daily: [],
        cairos: [],
    });

    useEffect(() => {
        if (profile) {
            setDefaultValues({
                daily: profile.dailyChecks?.[today],
                cairos: profile.cairosChecks?.[today],
            });
            setIsLoading(false);
        }
    }, [profile, today]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
        mode: "onChange",
        shouldUnregister: false,
    });

    useEffect(() => {
        if (!isLoading) {
            form.reset(defaultValues);
        }
    }, [defaultValues, isLoading, form]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsSubmitting(true);
        post("/questionnaire/checklist", data)
            .then(() => {
                afterSubmit();
                setIsSubmitting(false);
            })
            .catch((e) => {
                const error = e as Error;
                toast({
                    variant: "destructive",
                    title: "Помилка при збереженні чек-лістів.",
                    description: error.message,
                });
                setIsSubmitting(false);
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <h3>Щоденні завдання</h3>
                    {isLoading ? (
                        <div className="w-full flex flex-col gap-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="w-full h-10" />
                            ))}
                        </div>
                    ) : (<Checklist items={staticItems} name="daily" control={form.control}/>)}
                </div>

                <Separator className="my-2" />

                <div className="space-y-4">
                    <h3>Завдання Каірос</h3>
                    {isLoading ? (
                        <div className="w-full flex flex-col gap-2">
                            {Array.from({length: 12}).map((_, index) => (
                                <Skeleton key={index} className="w-full h-10"/>
                            ))}
                        </div>
                    ) : (<Checklist
                        items={cairosDaysTasks[new Date().getDay()]}
                        name="cairos"
                        control={form.control}
                    />)}
                </div>

                {submitButton === 'questionnaire_navigation' ? (
                    <QuestionnaireNavButtons
                        continueDisabled={false}
                        submitting={isSubmitting}
                        onContinue={() => {}}
                    />
                ) : (
                    <Button disabled={isSubmitting || isLoading}>
                        {(isSubmitting || isLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Зберегти
                    </Button>
                )}
            </form>
        </Form>
    );
}

export default Tasks;