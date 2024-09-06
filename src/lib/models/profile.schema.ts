import mongoose, { Document } from 'mongoose';
import { TSocraticQuestioning } from "@/lib/types";

export type TProfile = {
    email: string;
    birthdate: Date;
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
    },
    activity: Map<string, boolean>;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
};

interface ProfileDocument extends TProfile, Document {}

const ProfileSchema = new mongoose.Schema<ProfileDocument>(
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
        activity: {
            type: Map,
            of: Boolean,
            default: {},
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

// Intermediate function to update activity
ProfileSchema.post('findOne', function (doc, next) {
    if (doc) {
        const today = new Date().setHours(0, 0, 0, 0);

        // Set the activity to true for today
        doc.activity.set(today.toString(), true);

        // Save the document after modification
        doc.save().then(() => next()).catch(next);
    } else {
        next();
    }
});

export const Profile = mongoose.models.Profile || mongoose.model<ProfileDocument>('Profile', ProfileSchema);
