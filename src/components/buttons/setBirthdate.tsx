import {Button} from "@/components/ui/button";
import {Calendar as CalendarIcon} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {useToast} from "@/components/ui/use-toast";
import {SetBirthdateProps} from "@/lib/types";
import {useMemo, useState} from "react";
import {Calendar} from "@/components/ui/calendar";
import SearchSelect from "@/components/search-select";
import {useRequest} from "@/lib/hooks/useRequest";

function SetBirthdate({stateToStore, currentBirthday}: SetBirthdateProps) {
    const [birthdate, setBirthdate] = useState<Date | undefined>(currentBirthday);

    const {toast} = useToast();
    const {post} = useRequest();

    // State stores the date of the currently displayed calendar page.
    // If the user selects the year 2010 conditionally, the status changes to January 1, 2010,
    // and it is reset to the corresponding date.
    const [currentCalendarPage, setCurrentCalendarPage] = useState(() => new Date(currentBirthday?.toString() || ''));

    // Creating an array of years for year selection
    const currentYear = new Date().getFullYear();
    const yearsOptions = useMemo(() => {
        const startYear = currentYear - 13;
        const endYear = currentYear - 99;
        return Array.from({length: startYear - endYear + 1}, (_, i) => ({
            label: (startYear - i).toString(),
        }));
    }, [currentYear]);

    const handleStore = async () => {

        try {
            // await axios.post('/api/v1/birthdate', {birthdate}, {headers: {'x-csrf-token': csrfToken || ''}});
            await post('/birthdate', {birthdate});
            toast({
                title: "Збережено.",
                description: "Ваша дата народження збережена.",
            });
            stateToStore(birthdate);
        } catch (e) {
            const error = e as Error;
            toast({
                variant: "destructive",
                title: "Помилка при збереженні дати народження.",
                description: error.message,
            });
        }
    };

    const handleSelectYear = (year: string) => {
        setCurrentCalendarPage(new Date(`1/1/${year}`));
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <div className="inside-button">
                        <span>Встановити дату народження</span>
                        <CalendarIcon size={16}/>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="h-96">
                    <AlertDialogTitle>Встановіть дату свого народження</AlertDialogTitle>
                    <AlertDialogDescription>
                        <SearchSelect
                            placeholder="Виберьте рік..."
                            searchPlaceholder="Пошук року..."
                            notFoundError="Рік не знайдено"
                            options={yearsOptions}
                            onSelect={handleSelectYear}
                        />
                        <Calendar
                            mode="single"
                            selected={birthdate}
                            onSelect={setBirthdate}
                            className="rounded-md border"
                            today={currentCalendarPage}
                            key={currentCalendarPage.getTime()}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleStore} disabled={!birthdate}>
                        Зберегти
                    </AlertDialogCancel>
                    <AlertDialogAction>
                        Відмінити
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default SetBirthdate;
