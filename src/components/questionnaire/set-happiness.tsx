import {Slider} from "@/components/ui/slider";
import React, {useEffect, useState} from "react";
import {Happiness} from "@/lib/classes/Happiness";
import './set-happiness.scss';
import {useAuth} from "@/lib/hooks/useAuth";
import {Skeleton} from "@/components/ui/skeleton";

function SetHappiness({setState}: {
    setState: (value: number) => void;
}) {

    const today = new Date().setHours(0, 0, 0, 0);
    const defaultValue = Happiness.MAX_VALUE / 2;

    const {profile} = useAuth();
    const [value, setValue] = useState<number>(defaultValue);
    const [happiness, setHappiness] = useState<string>();

    useEffect(() => {
        if (value) {
            const happiness = new Happiness(value);
            setHappiness(happiness.get());
            setState(value); // Set the happiness value for the external state
        }
    }, [value]);

    useEffect(() => {
        if (profile && profile.happiness?.[today]) {
            setValue(profile.happiness[today]);
        }
    }, [profile]);

    return (
        <div className="happiness-set">
            <Slider
                defaultValue={[defaultValue]}
                value={[value]}
                max={Happiness.MAX_VALUE}
                step={1}
                onValueChange={(value) => setValue(value[0])}
            />
            {!profile ? (
                <div className="w-full flex justify-center">
                    <Skeleton className="w-24 h-6" />
                </div>
            ) : (<p>{happiness}</p>)}
        </div>
    );
}

export default SetHappiness;