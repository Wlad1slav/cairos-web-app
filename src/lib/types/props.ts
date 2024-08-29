import React, {Dispatch, SetStateAction} from "react";
import {ProfileModel} from "@/lib/models";
import {Session} from "next-auth";

export type AchievementBoxProps = {
    icon: React.ReactNode;
    condition: string;
};

export type AuthProviderProps = {
    profile: ProfileModel | null;
    session: Session | null;
};

export type SetBirthdateProps = {
    stateToStore: Dispatch<SetStateAction<Date | undefined>>;
    currentBirthday?: Date;
};

export type SearchSelectProps = {
    placeholder: string;
    searchPlaceholder: string;
    notFoundError: string;
    options: {
        label: string;
        value?: string;
    }[];
    onSelect: (value: string) => void;
};