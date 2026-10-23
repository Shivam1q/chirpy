import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date().toDateString()),
    email: varchar("email", { length: 256 }).unique().notNull(),
});
export const chirps = pgTable("chirps", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date().toDateString()),
    body: text("body").notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
});
