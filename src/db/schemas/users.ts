import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    mail: text('mail').notNull().unique(),
    password_hash: text('password_hash').notNull(),
    name: text('name').notNull().unique(),
    image_url: text('image_url'),
    permissions: integer('permissions').notNull().default(2)
});

export type DBUserInsert = typeof usersTable.$inferInsert;
export type DBUserSelect = typeof usersTable.$inferSelect;
