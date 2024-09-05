import mongoose from 'mongoose';

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
    isAdmin: boolean;
};

export const Profile = mongoose.models.Profile || mongoose.model<TProfile>('Profile', ProfileSchema);