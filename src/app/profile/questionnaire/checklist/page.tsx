"use client"

import Tasks from "@/components/questionnaire/tasks";
import React from "react";
import {useRouter} from "next/navigation";

function QuestionnaireChecklistPage() {

    const router = useRouter();

    return (
        <main>
            <div className="questionnaire-container">
                <h1>Чек-ліст ☑️</h1>
                <Tasks
                    submitButton={'questionnaire_navigation'}
                    afterSubmit={() => router.push('/profile/questionnaire/quote')}
                />
            </div>
        </main>
    );
}

export default QuestionnaireChecklistPage;
