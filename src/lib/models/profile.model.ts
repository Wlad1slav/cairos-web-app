import {db} from "@/lib/constants";

export type ProfileModel = {
    email: string;
    birthdate?: string;
}

export const Profile = db.collection("profiles");