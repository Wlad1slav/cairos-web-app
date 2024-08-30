'use client';

import {useAuth} from "@/lib/hooks/useAuth";
import {Skeleton} from "@/components/ui/skeleton";
import cairosDays from "@/lib/constants/cairosDays";
import LeftUntilHundred from "@/components/widgets/leftUntilHundred";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Calendar} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import SetBirthdate from "@/components/buttons/setBirthdate";
import SetHappiness from "@/components/questionnaire/set-happiness";
import SelectLastActivities from "@/components/questionnaire/select-last-activities";
import axios from "axios";
import QuestionnaireNavButtons from "@/components/questionnaire/questionnaire-nav-buttons";
import {useToast} from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';

function QuestionnairePage() {
    const {session, profile} = useAuth();

    const { toast } = useToast();
    const router = useRouter();

    const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
    const [happinessValue, setHappinessValue] = useState<number>();
    const [recentActivity, setRecentActivity] = useState<string>();
    const [submitting, setSubmitting] = useState(false);

    // A random variant of the skin color of the emoji that greets the user
    const [skinTone] = useState<number>(Math.floor(Math.random() * (6 - 2 + 1)) + 2);

    useEffect(() => {
        setBirthdate(profile?.birthdate ? new Date(profile?.birthdate) : undefined);
    }, [profile]);

    const handleHappinessChange = useCallback((value: number) => {
        setHappinessValue(value);
    }, []);

    const handleRecentActivityChange = useCallback((value: string) => {
        setRecentActivity(value);
    }, []);

    const handleStoreMood = () => {
        setSubmitting(true);
        axios.post('/api/v1/questionnaire/mood', {happinessValue, recentActivity})
            .then(() => router.push('/profile/questionnaire/checklist'))
            .catch((e) => {
                const error = e as Error;
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Помилка при збереженні.",
                    description: error.message,
                });
                setSubmitting(false);
            });
    }

    const dayWeek = new Date().getDay();
    const cairosDay = cairosDays[dayWeek];

    return (
        <main>
            <div className="questionnaire-container">
                <h1>
                    <span>
                    Привіт, {session === undefined || !profile
                        ? (<Skeleton className="h-12 w-[200px]"/>)
                        : session?.user?.name
                    }
                        <p className={`emoji--skin-tone-${skinTone}`}>&#128587;</p>
                    </span>
                </h1>

                <p className="questionnaire-container--today">Сьогодні <b>{cairosDay.weekDayLocalKey},</b> {cairosDay.dayNumber}й
                    день <b>Каіросу,</b> а також <cairosDay.DayIcon/> {cairosDay.dayNameLocalKey}.
                </p>

                {session === undefined || !profile
                    ? (<Skeleton className="w-full h-20"/>)
                    : birthdate ? (
                        <LeftUntilHundred birthdate={birthdate}/>
                    ) : (
                        <>
                            <Alert variant="destructive">
                                <Calendar className="h-4 w-4"/>
                                <AlertTitle>Дата народження</AlertTitle>
                                <AlertDescription>
                                    Ви досі не встановили дату свого народження.
                                </AlertDescription>
                            </Alert>
                            <SetBirthdate stateToStore={setBirthdate}
                                          currentBirthday={new Date(profile?.birthdate ?? '')}/>
                        </>
                    )
                }

                <h2>Рівень щастя 🌈</h2>
                <SetHappiness setState={handleHappinessChange} />

                <SelectLastActivities setState={handleRecentActivityChange} />

                <QuestionnaireNavButtons
                    continueDisabled={!happinessValue || !recentActivity}
                    submitting={submitting}
                    onContinue={handleStoreMood}
                    backUrl="/profile"
                    nextUrl="/profile/questionnaire/checklist"
                />
            </div>
        </main>
    );
}

export default QuestionnairePage;