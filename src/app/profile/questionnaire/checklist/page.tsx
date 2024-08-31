"use client"

import Tasks from "@/components/questionnaire/tasks";
import QuestionnaireNavButtons from "@/components/questionnaire/questionnaire-nav-buttons";
import React from "react";
import {useRouter} from "next/navigation";

function QuestionnaireChecklistPage() {

    const router = useRouter();

    return (
        <main>
            <div className="questionnaire-container">
                <h1>Чек-ліст ☑️</h1>
                <Tasks
                    submitButton={
                        <QuestionnaireNavButtons
                            continueDisabled={false}
                            submitting={false}
                            onContinue={() => {}}
                            backUrl="/profile/questionnaire/mood"
                            nextUrl="/profile/questionnaire/quote"
                        />
                    }
                    afterSubmit={() => router.push('/profile/questionnaire/quote')}
                />
            </div>
        </main>
    );
}

export default QuestionnaireChecklistPage;
