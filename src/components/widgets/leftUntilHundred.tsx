import { Calendar } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function LeftUntilHundred({ birthdate }: { birthdate: Date }) {
    const now = new Date();
    const hundredYearsDate = new Date(birthdate);
    hundredYearsDate.setFullYear(hundredYearsDate.getFullYear() + 100);

    // Calculation of the difference between the current date and the date of reaching 100 years
    const diffInMs = hundredYearsDate.getTime() - now.getTime();

    // Calculation of years, months, weeks and days
    const years = hundredYearsDate.getFullYear() - now.getFullYear();
    const months = years * 12 + (hundredYearsDate.getMonth() - now.getMonth());
    const weeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return (
        <Alert>
            <Calendar className="h-4 w-4" />
            <AlertTitle className="font-extrabold">{days} днів до 100 років!</AlertTitle>
            <AlertDescription>
                Вам залишилося {years} років або {months} місяців або {weeks} тижнів до 100 років
            </AlertDescription>
        </Alert>
    );
}

export default LeftUntilHundred;
