import client from "@/lib/mongodb";

export const dbName = 'CairosDB';
export const db = client.db(dbName);

export const noSessionError = {
    message: "No such session found.",
};