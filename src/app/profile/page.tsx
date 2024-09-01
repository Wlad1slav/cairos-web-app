'use client'

import Image from "next/image";
import './style.scss';
import {BookmarkCheck, Calendar, MessageCircleQuestion, Trophy} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import SignOut from "@/components/buttons/signOut";
import CairosTelegram from "@/components/buttons/cairosTelegram";
import FillDailyQuestionnaire from "@/components/buttons/fillDailyQuestionnaire";
import {useAuth} from "@/lib/hooks/useAuth";
import SetBirthdate from "@/components/buttons/setBirthdate";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {useEffect, useState} from "react";
import LeftUntilHundred from "@/components/widgets/leftUntilHundred";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function ProfilePage() {

    const today = new Date().setHours(0, 0, 0, 0);

    const {session, profile} = useAuth();
    const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
    const [questionnaire, setQuestionnaire] = useState<{
        mood: boolean;
        checklist: boolean;
    }>({
        mood: false,
        checklist: false
    });

    useEffect(() => {
        setBirthdate(profile?.birthdate ? new Date(profile?.birthdate) : undefined);

        if (profile && profile.questionnaire?.[today]) {
            setQuestionnaire({
                mood: profile?.questionnaire[today]?.mood ?? false,
                checklist: profile?.questionnaire?.[today]?.checklist ?? false,
            });
        }
    }, [profile]);

    return (
        <main>
            <Tabs defaultValue="account" className="w-[400px] profile-container">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Профіль</TabsTrigger>
                    <TabsTrigger value="achievements">
                        <div className="inside-button">
                            <Trophy/>
                            <p>Досягнення</p>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <div className="profile-container--content">
                        {session === undefined || !profile ? (
                            <Skeleton className="w-[200px] h-[200px] rounded-full" />
                        ) : session?.user?.image && (
                            <Image
                                src={session.user?.image}
                                alt={`${session.user?.name} avatar`}
                                width={200}
                                height={200}
                            />
                        )}
                        {session === undefined || !profile
                            ? ( <Skeleton className="w-full h-10" /> )
                            : ( <h1>{session?.user?.name}</h1> )
                        }

                        {session === undefined || !profile
                            ? ( <Skeleton className="w-full h-24" /> )
                            : (
                                <Alert
                                    className="w-full"
                                    variant={questionnaire?.checklist && questionnaire?.mood ? "default" : 'destructive'}>
                                    { questionnaire?.checklist && questionnaire?.mood ? (
                                        <BookmarkCheck />
                                    ) : (<MessageCircleQuestion className="h-4 w-4"/>)}
                                    <AlertTitle>Квестінарій</AlertTitle>
                                    <AlertDescription>
                                        { !questionnaire?.checklist || !questionnaire?.mood ? (
                                            questionnaire?.checklist || questionnaire?.mood ? 'Ви не закінчили Квестінарій за сьогодні. Обов\'язково виправте це!' : 'Квестінарій сьогодні не пройдений. Обов\'язково виправте це!'
                                        ) : 'Квестінарій пройден. Ви молодці!' }
                                    </AlertDescription>
                                </Alert>
                            )
                        }

                        {session === undefined || !profile
                            ? ( <Skeleton className="w-full h-24" /> )
                            : birthdate ? (
                                <LeftUntilHundred birthdate={birthdate}/>
                            ) : (
                                <Alert variant="destructive">
                                    <Calendar className="h-4 w-4"/>
                                    <AlertTitle>Дата народження</AlertTitle>
                                    <AlertDescription>
                                        Ви досі не встановили дату свого народження.
                                    </AlertDescription>
                                </Alert>
                            )
                        }

                    </div>
                    <div className="buttons">
                        {session === undefined || !profile
                            ? (
                                Array.from({length: 4}).map((_, index) => (
                                    <Skeleton key={index} className="w-full h-10" />
                                ))
                            )
                            : (
                                <>
                                    {(questionnaire.checklist && questionnaire.mood) && (
                                        <Link href="/profile/checklist" className="w-full">
                                            <Button className="w-full font-bold">
                                                Дозаповнити Чекліст
                                            </Button>
                                        </Link>
                                    )}
                                    {questionnaire && <FillDailyQuestionnaire completion={questionnaire}/>}
                                    <SetBirthdate stateToStore={setBirthdate} currentBirthday={new Date(profile.birthdate ?? '01.01.2000')}/>
                                    <CairosTelegram/>
                                    <SignOut />
                                </>
                            )
                        }
                    </div>
                </TabsContent>
                <TabsContent value="achievements">
                    <h1 className="w-full text-center">Coming soon...</h1>
                    {/*<div className="profile-container--achievements">*/}
                    {/*    <AchievementBox icon={<StarIcon size="50px"/>} condition={'Заповнити щоденну анкету'}/>*/}
                    {/*</div>*/}
                </TabsContent>
            </Tabs>
        </main>
    );
}

export default ProfilePage;