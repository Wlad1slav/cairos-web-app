'use client'

import './style.scss';
import Tasks from "@/components/questionnaire/tasks";
import {useToast} from "@/components/ui/use-toast";

function ChecklistPage() {
    const { toast } = useToast();
    
    return (
        <main>
            <div className="container">
                <Tasks submitButton="button" afterSubmit={() => toast({title: "Чеклісти збереженні"})} />
            </div>
        </main>
    );
}

export default ChecklistPage;