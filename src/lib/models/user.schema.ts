import mongoose, {Schema} from 'mongoose';
import {TUser} from "@/lib/types";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: false,
    }
});

export const User = mongoose.models.User || mongoose.model<TUser>('User', UserSchema);

export default User;
