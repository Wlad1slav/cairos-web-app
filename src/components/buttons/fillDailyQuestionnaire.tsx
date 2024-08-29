import Link from "next/link";
import {Button} from "@/components/ui/button";
import {MessageCircleQuestion} from "lucide-react";

function FillDailyQuestionnaire() {
    return (
        <Link href="/profile/questionnaire">
            <Button className="w-full">
                <div className="inside-button">
                    <p className="font-bold">Пройти щоденний Квестінарій</p>
                    <MessageCircleQuestion size={16} />
                </div>
            </Button>
        </Link>
    );
}

export default FillDailyQuestionnaire;