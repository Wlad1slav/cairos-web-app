import React from "react";
import React, {Dispatch, SetStateAction} from "react";

export type AchievementBoxProps = {
    icon: React.ReactNode;
    condition: string;
export type SetBirthdateProps = {
    stateToStore: Dispatch<SetStateAction<Date | undefined>>;
    currentDate: Date;
};