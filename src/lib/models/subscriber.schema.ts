import mongoose from 'mongoose';
import {TSubscriber} from "@/lib/types";

const SubscriberSchema = new mongoose.Schema(
    {
        email: String,
    }
);

export const Subscriber = mongoose.models.Subscriber || mongoose.model<TSubscriber>('Subscriber', SubscriberSchema);