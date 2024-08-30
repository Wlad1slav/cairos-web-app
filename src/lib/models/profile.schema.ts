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
};

export const Profile = mongoose.models.Profile || mongoose.model<TProfile>('Profile', ProfileSchema);