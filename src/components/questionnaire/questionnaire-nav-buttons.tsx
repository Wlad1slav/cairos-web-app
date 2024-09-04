import {Button} from "@/components/ui/button";
import {QuestionnaireNavButtonsProps} from "@/lib/types";
import {Loader2} from "lucide-react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
import {questionnaireSequence} from "@/config/questionnaire.config";

function QuestionnaireNavButtons(
    {
        continueDisabled,
        submitting,
        onContinue,
        enableNext = true,
    }: QuestionnaireNavButtonsProps) {

    const path = usePathname()?.split("/");

    const router = useRouter();
    const [currentUrl] = useState<string>(path[path.length - 1]);
    const [nextUrlIndex] = useState(questionnaireSequence.indexOf(currentUrl) + 1);

    return (
        <div className="buttons mt-6">
            <Button variant="outline" onClick={() => router.back()}>
                Назад
            </Button>
            {(enableNext && !(nextUrlIndex === questionnaireSequence.length)) && (
                <Link href={`/profile/questionnaire/${questionnaireSequence[nextUrlIndex]}`}>
                    <Button variant="outline">
                        Пропустити
                    </Button>
                </Link>)}
            {nextUrlIndex === questionnaireSequence.length ? (
                <a href={'/profile/'}>
                    <Button>
                        Закінчити
                    </Button>
                </a>
            ) : (<Button
                disabled={continueDisabled || submitting}
                onClick={() => {
                    if (onContinue) {
                        onContinue();
                    }
                    router.push(`/profile/questionnaire/${questionnaireSequence[nextUrlIndex]}`);
                }}
                type="submit"
            >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Продовжити
            </Button>)}
        </div>
    );
}

export default QuestionnaireNavButtons;