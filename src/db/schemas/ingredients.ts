import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const ingredientsTable = pgTable('ingredients', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique()
});

export type DBIngredientInsert = typeof ingredientsTable.$inferInsert;
export type DBIngredientSelect = typeof ingredientsTable.$inferSelect;
