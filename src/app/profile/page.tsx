'use client'

import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import './style.scss';
import {StarIcon, Trophy} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AchievementBox from "@/components/achievements/achievement-box";

function ProfilePage() {
    const {data: session} = useSession();

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
                        {session?.user?.image && (
                            <Image
                                src={session?.user?.image}
                                alt={`${session?.user?.name} avatar`}
                                width={200}
                                height={200}
                            />
                        ) }
                        <h1>{session?.user?.name}</h1>
                        <small className="text-sm font-medium leading-none">{session?.user?.email}</small>
                    </div>
                    <div className="buttons">
                        <Button variant="destructive" onClick={() => signOut()}>Вийти</Button>
                    </div>
                </TabsContent>
                <TabsContent value="achievements">
                    <div className="profile-container--achievements">
                        <AchievementBox icon={<StarIcon size="50px" />} condition={'Заповнити щоденну анкету'}  />
                        <AchievementBox icon={<StarIcon size="50px" />} condition={'Заповнити щоденну анкету'} />
                        <AchievementBox icon={<StarIcon size="50px" />} condition={'Заповнити щоденну анкету'} />
                        <AchievementBox icon={<StarIcon size="50px" />} condition={'Заповнити щоденну анкету'} />
                        <AchievementBox icon={<StarIcon size="50px" />} condition={'Заповнити щоденну анкету'} />
                        <AchievementBox icon={<StarIcon size="50px" />} condition={'Заповнити щоденну анкету'} />
                     </div>
                </TabsContent>
            </Tabs>
        </main>
);
}

export default ProfilePage;