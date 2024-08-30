import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {basicActivities} from "@/lib/constants/basicActivities";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

function SelectLastActivities({setState} : {
    setState: (value: string) => void;
}) {
    const [_, setValue] = useState<string>();
    const [ownAnswer, setOwnAnswer] = useState<boolean>(false);

    const handleChange = (value: string) => {
        setValue(value);
        setState(value);
    };

    return (
        <div>
            {ownAnswer ? (
                <>
                    <Label htmlFor="ownAnswer">
                        Чим займався останні 30 хвилин?
                    </Label>
                    <Input
                        id="ownAnswer"
                        placeholder={basicActivities[0]}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </>
            ) : (<Select onValueChange={(value) => {
                if (value === 'own') {
                    setOwnAnswer(true);
                } else {
                    handleChange(value);
                }
            }}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Обознач, чим займався останні 30 хвилин"/>
                </SelectTrigger>
                <SelectContent>
                    {basicActivities.map(activity => (
                        <SelectItem value={activity} key={activity}>{activity}</SelectItem>
                    ))}
                    <SelectItem value="Не відповів">Не хочу відповідати</SelectItem>
                    <SelectItem value="own" className="font-bold">
                        Своя відповідь
                    </SelectItem>
                </SelectContent>
            </Select>)}
        </div>
    );
}

export default SelectLastActivities;