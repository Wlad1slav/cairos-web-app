import React, {Dispatch, SetStateAction} from "react";
import {TProfile} from "@/lib/models";
import {Session} from "next-auth";
import QuestionnaireNavButtons from "@/components/questionnaire/questionnaire-nav-buttons";

export type AchievementBoxProps = {
    icon: React.ReactNode;
    condition: string;
};

export type AuthProviderProps = {
    profile: TProfile | null;
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

export type QuestionnaireNavButtonsProps = {
    continueDisabled: boolean;
    submitting: boolean;
    onContinue?: () => void;
    enableNext?: boolean;
};

export type ChecklistProps = {
    items: { label: string, description: string }[];
    name: string;
    control: any;
};