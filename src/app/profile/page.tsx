'use client'

import Image from "next/image";
import './style.scss';
import {Calendar, MessageCircleQuestion, StarIcon, Trophy} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AchievementBox from "@/components/achievements/achievement-box";
import SignOut from "@/components/buttons/signOut";
import CairosTelegram from "@/components/buttons/cairosTelegram";
import FillDailyQuestionnaire from "@/components/buttons/fillDailyQuestionnaire";
import {useAuth} from "@/lib/hooks/useAuth";
import SetBirthdate from "@/components/buttons/setBirthdate";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {useEffect, useState} from "react";
import LeftUntilHundred from "@/components/widgets/leftUntilHundred";
import {Skeleton} from "@/components/ui/skeleton";

function ProfilePage() {
    const {session, profile} = useAuth();

    const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        setBirthdate(profile?.birthdate ? new Date(profile?.birthdate) : undefined);
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
                                <Alert className="w-full" variant="destructive">
                                    <MessageCircleQuestion className="h-4 w-4"/>
                                    <AlertTitle>Квестінарій</AlertTitle>
                                    <AlertDescription>
                                        Квестінарій сьогодні не пройдений. Обов&apos;язково виправте це!
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
                        <FillDailyQuestionnaire/>
                        {session === undefined || !profile
                            ? ( <Skeleton className="w-full h-10" /> )
                            : ( <SetBirthdate stateToStore={setBirthdate} currentBirthday={new Date(profile.birthdate ?? '01.01.2000')}/> )
                        }
                        <CairosTelegram/>
                        <SignOut/>
                    </div>
                </TabsContent>
                <TabsContent value="achievements">
                    <div className="profile-container--achievements">
                        <AchievementBox icon={<StarIcon size="50px"/>} condition={'Заповнити щоденну анкету'}/>
                        <AchievementBox icon={<StarIcon size="50px"/>} condition={'Заповнити щоденну анкету'}/>
                        <AchievementBox icon={<StarIcon size="50px"/>} condition={'Заповнити щоденну анкету'}/>
                        <AchievementBox icon={<StarIcon size="50px"/>} condition={'Заповнити щоденну анкету'}/>
                        <AchievementBox icon={<StarIcon size="50px"/>} condition={'Заповнити щоденну анкету'}/>
                        <AchievementBox icon={<StarIcon size="50px"/>} condition={'Заповнити щоденну анкету'}/>
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
}

export default ProfilePage;