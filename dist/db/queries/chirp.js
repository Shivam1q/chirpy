import { asc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { chirps } from "../schema.js";
export const createChirp = async (chirp) => {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .onConflictDoNothing()
        .returning();
    return result;
};
export const getAllChirps = async () => {
    const result = await db.select().from(chirps).orderBy(asc(chirps.createdAt));
    return result;
};
export const getChirp = async (id) => {
    const result = await db.select().from(chirps).where(eq(chirps.id, id));
    return result;
};
