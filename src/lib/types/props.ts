import React, {Dispatch, SetStateAction} from "react";
import {TProfile} from "@/lib/models";
import {Session} from "next-auth";
import {TChartData} from "@/lib/types/index";

export type AchievementBoxProps = {
    icon: React.ReactNode;
    condition: string;
};

export type AuthProviderProps = {
    profile: TProfile | null;
    session: Session | null;
};

export type AdminProviderProps = {
    isAdmin: boolean;
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

export type TablePaginationProps = {
    page: number;
    totalPages: number;
};

export type IconProps = {
    color?: string;
    width?: number;
    height?: number;
    className?: string;
    viewBox?: string;
};

export type DateAmountChartProps = {
    data: TChartData[];
};

export type PolicyProps = {
    policies: {
        heading: string;
        content: string[];
    }[];
};