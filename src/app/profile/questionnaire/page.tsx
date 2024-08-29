'use client';

import {useAuth} from "@/lib/hooks/useAuth";

function QuestionnairePage() {
    const {session} = useAuth();
    if (session && session.user) {
        return (
            <main>
                <h1>Привіт, ${session.user.name}</h1>
            </main>
        );
    }
}

export default QuestionnairePage;