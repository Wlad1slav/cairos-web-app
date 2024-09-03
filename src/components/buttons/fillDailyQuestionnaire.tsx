import Link from "next/link";
import {Button} from "@/components/ui/button";
import {MessageCircleQuestion} from "lucide-react";

function FillDailyQuestionnaire({completion}: {
    completion: {
        mood: boolean | undefined;
        checklist: boolean | undefined;
    }
}) {
    return (
            <Button className="p-0" disabled={completion.mood && completion.checklist}>
                <Link
                    className="w-full h-full"
                    href={!completion.mood ? "/profile/questionnaire/mood" : "/profile/questionnaire/checklist"}
                >
                <div className="inside-button flex justify-center p-2.5">
                    <p className={!completion.mood || !completion.checklist ? "font-bold" : undefined} id="questionnaireButtonText">
                        { completion.mood && completion.checklist ? (
                            'Сьогоднішній Квестінарій пройдений'
                        ) : (
                            !completion.mood && !completion.checklist ? 'Пройти щоденний Квестінарій' : 'Закінчити щоденний Квестінарій'
                        ) }
                    </p>
                    <MessageCircleQuestion size={16} />
                </div>
                </Link>
            </Button>
    );
}

export default FillDailyQuestionnaire;