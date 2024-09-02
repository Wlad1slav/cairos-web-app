import { Calendar } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {calculateForHundredYearTime} from "@/lib/utils";

function LeftUntilHundred({ birthdate }: { birthdate: Date }) {
    // Calculate expected values
    const {days, weeks, months, years} = calculateForHundredYearTime(birthdate);

    return (
        <Alert className="alert">
            <Calendar className="h-4 w-4" />
            <AlertTitle className="font-extrabold">{days === 0 ? 'Ви досягли мети 😱' : `${days} днів до 100 років!`}</AlertTitle>
            <AlertDescription>
                {days === 0 ? (
                    'У нас немає слів, ви просто герой! Ви стали героєм не тільки свого, але і нашого роману.'
                ) : (`Вам залишилося ${years} років або ${months} місяців або ${weeks} тижнів до 100 років`)}
            </AlertDescription>
        </Alert>
    );
}

export default LeftUntilHundred;
