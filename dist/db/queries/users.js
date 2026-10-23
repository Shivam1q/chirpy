import { db } from "../index.js";
import { users } from "../schema.js";
export const createUser = async (user) => {
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return result;
};
export const deleteAllUser = async () => {
    const result = await db.delete(users).returning();
    return result;
};
