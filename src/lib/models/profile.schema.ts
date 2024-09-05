import mongoose from 'mongoose';
import {TSocraticQuestioning} from "@/lib/types";

const ProfileSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        birthdate: {
            type: Date
        },
        happiness: {
            type: Map,
            of: Number,
        },
        recentActions: {
            type: Map,
            of: String,
        },
        dailyChecks: {
            type: Map,
            of: [String],
        },
        cairosChecks: {
            type: Map,
            of: [String],
        },
        questionnaire: {
            type: Map,
            of: {
                mood: Boolean,
                checklist: Boolean,
            },
        },
        reflexive: {
            type: Map,
            of: {
                quote: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Reflexive',
                },
                question: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Reflexive',
                },
                action: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Reflexive',
                }
            },
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export type TProfile = {
    email: string;
    birthdate: string;
    happiness: { [key: string]: number; };
    recentActions: { [key: string]: string; };
    dailyChecks: { [key: string]: string[]; };
    cairosChecks: { [key: string]: string[]; };
    questionnaire: { [key: string]: { mood: boolean; checklist: boolean; }; };
    reflexive: {
        [key: string]: {
            quote: TSocraticQuestioning;
            question: TSocraticQuestioning;
            action: TSocraticQuestioning;
        }
    }
    isAdmin: boolean;
};

export const Profile = mongoose.models.Profile || mongoose.model<TProfile>('Profile', ProfileSchema);