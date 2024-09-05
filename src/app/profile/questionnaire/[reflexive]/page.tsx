'use client';

import QuestionnaireNavButtons from "@/components/questionnaire/questionnaire-nav-buttons";
import {MessageCircleQuestion} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {TSocraticQuestioning} from "@/lib/types";
import {useRequest} from "@/lib/hooks/useRequest";
import reflexive from "@/lib/constants/reflexive";
import {useToast} from "@/components/ui/use-toast";
import {Skeleton} from "@/components/ui/skeleton";
import Image from "next/image";

function QuestionnaireQuotePage() {

    const [isSubmit, setIsSubmit] = useState(false);
    const router = useRouter();
    const {reflexive: type} = useParams();
    const [stored, setStored] = useState<TSocraticQuestioning>();
    const {post} = useRequest();
    const {toast} = useToast();

    useEffect(() => {
        post(`/questionnaire/reflexive`, {type})
            .then((res) => setStored(res.data.reflexive))
            .catch((err) => {
                const error = err as Error;
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Помилка при збереженні дати народження.",
                    description: error.message,
                });
            });
    }, []);

    return (
        <main>
            <div className="questionnaire-container">
                {stored ? (
                    <>
                        <h1>
                            {reflexive[type as string]}
                            <MessageCircleQuestion/>
                        </h1>
                        <Image
                            src={stored.imageUrl}
                            className="rounded"
                            alt={'reflexive'}
                            width={640} height={480}
                        />
                        <blockquote className="mt-6 border-l-2 pl-6 italic">
                            {stored.text}
                        </blockquote>
                    </>
                ) : (
                    <>
                        <Skeleton className="w-full" style={{height: "4.5rem"}}/>
                        <Skeleton className="w-full h-[400px]" />
                        <Skeleton className="w-full" style={{height: "4.5rem"}}/>
                    </>
                )}

                <QuestionnaireNavButtons
                    continueDisabled={false}
                    submitting={isSubmit}
                    enableNext={false}
                    onContinue={() => {
                        setIsSubmit(true);
                        router.push('/profile');
                    }}
                />
            </div>
        </main>
    );
}

export default QuestionnaireQuotePage;