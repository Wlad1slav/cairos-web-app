import {Button} from "@/components/ui/button";
import {QuestionnaireNavButtonsProps} from "@/lib/types";
import {Loader2} from "lucide-react";
import Link from "next/link";

function QuestionnaireNavButtons(
    {
        continueDisabled,
        submitting,
        onContinue,
        nextUrl,
        backUrl,
        enableNext = true,
        end = false
    }: QuestionnaireNavButtonsProps) {

    return (
        <div className="buttons mt-6">
            <Link href={backUrl} prefetch={false}>
                <Button variant="outline">
                    Назад
                </Button>
            </Link>
            {(enableNext && !end) && (<Link href={nextUrl}>
                <Button variant="outline">
                    Пропустити
                </Button>
            </Link>)}
            {end ? (
                <a href={nextUrl}>
                    <Button>
                        Закінчити
                    </Button>
                </a>
            ) : (<Button
                disabled={continueDisabled || submitting}
                onClick={onContinue}
                type="submit"
            >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Продовжити
            </Button>)}
        </div>
    );
}

export default QuestionnaireNavButtons;