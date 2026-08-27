import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const tagsTable = pgTable('tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    color: text('color')
});

export type DBTagInsert = typeof tagsTable.$inferInsert;
export type DBTagSelect = typeof tagsTable.$inferSelect;
