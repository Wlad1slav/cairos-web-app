import {Slider} from "@/components/ui/slider";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Happiness} from "@/lib/classes/Happiness";
import './set-happiness.scss';

function SetHappiness({setState}: {
    setState: (value: number) => void;
}) {

    const [value, setValue] = useState<number>();
    const [happiness, setHappiness] = useState<string>();

    useEffect(() => {
        if (value) {
            const happiness = new Happiness(value);
            setHappiness(happiness.get());
            setState(value); // Set the happiness value for the external state
        }
    }, [value]);

    return (
        <div className="happiness-set">
            <Slider
                defaultValue={[Happiness.MAX_VALUE / 2]}
                max={Happiness.MAX_VALUE}
                step={1}
                onValueChange={(value) => setValue(value[0])}
            />
            <p>{happiness}</p>
        </div>
    );
}

export default SetHappiness;