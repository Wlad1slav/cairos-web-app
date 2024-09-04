import mongoose from 'mongoose';
import {TSocraticQuestioning} from "@/lib/types";

const ReflexiveSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            unique: true
        },
        imageUrl: String,
        day: Number,
        type: String,
    }
);

export const Reflexive = mongoose.models.Reflexive || mongoose.model<TSocraticQuestioning>('Reflexive', ReflexiveSchema);