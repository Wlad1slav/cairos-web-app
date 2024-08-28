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
} from "@/components/ui/alert-dialog"
import { Calendar } from "@/components/ui/calendar"
import React from "react";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast";
import {SetBirthdateProps} from "@/lib/types";

function SetBirthdate({stateToStore, currentDate}: SetBirthdateProps) {
    const [birthdate, setBirthdate] = React.useState<Date | undefined>();
    const { toast } = useToast();

    const handleStore = () => {
        axios.post('/api/v1/birthdate', {birthdate})
            .then(() => {
                toast({
                    title: "Збережено.",
                    description: "Ваша дата народження збережена.",
                });
                stateToStore(birthdate);
            })
            .catch((e) => {
                toast({
                    variant: "destructive",
                    title: `Помилка при збереженні дати народження.`,
                    description: e.message,
                })
            });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant={"outline"} className="w-full">
                    <div className="inside-button">
                        <p>Встановити дату народження</p>
                        <CalendarIcon size={16} />
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Встановіть дату свого народження</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Calendar
                            mode="single"
                            selected={birthdate}
                            onSelect={setBirthdate}
                            className="rounded-md border"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={!birthdate}
                        onClick={handleStore}
                    >
                        Зберегти
                    </AlertDialogCancel>
                    <AlertDialogAction>Відмінити</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default SetBirthdate;