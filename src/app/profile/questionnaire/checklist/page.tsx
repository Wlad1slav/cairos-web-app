"use client"

import Tasks from "@/components/questionnaire/tasks";
import React from "react";
import {useToast} from "@/components/ui/use-toast";

function QuestionnaireChecklistPage() {

    const {toast} = useToast();

    return (
        <main>
            <div className="questionnaire-container">
                <h1>Чек-ліст ☑️</h1>
                <Tasks
                    submitButton={'questionnaire_navigation'}
                    afterSubmit={() => toast({title: "Чеклісти збереженні"})}
                />
            </div>
        </main>
    );
}

export default QuestionnaireChecklistPage;
