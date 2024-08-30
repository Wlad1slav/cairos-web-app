import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        birthdate: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true
    }
);

export type TProfile = {
    email: string;
    birthdate: string;
};

export const Profile = mongoose.models.Profile || mongoose.model<TProfile>('Profile', ProfileSchema);