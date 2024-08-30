import client from "@/lib/mongodb";

export const dbName = 'CairosDB';
export const db = client.db(dbName);