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
        happiness: [{ level: Number, date: Date }],
        recentActions: [{ action: String, date: Date }],
        dailyChecks: {
            type: Map,
            of: [String],
        },
        cairosChecks: {
            type: Map,
            of: [String],
        }
    },
    {
        timestamps: true
    }
);

export type TProfile = {
    email: string;
    birthdate: string;
    happiness: { level: number; date: string; }[];
    recentActions: { action: string; date: string; }[];
    dailyChecks: { [key: string]: string[] };
    cairosChecks: { [key: string]: string[] };
};

export const Profile = mongoose.models.Profile || mongoose.model<TProfile>('Profile', ProfileSchema);