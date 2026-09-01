import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { usersTable } from "./users.js";

export const librariesTable = pgTable('libraries', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    owner_id: uuid('owner_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' })
});

export type DBLibraryInsert = typeof librariesTable.$inferInsert;
export type DBLibrarySelect = typeof librariesTable.$inferSelect;
