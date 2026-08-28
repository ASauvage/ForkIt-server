import { relations } from "drizzle-orm";
import { librariesTable } from "./libraries.js";
import { recipesTable } from "./recipes.js";

export const librariesRelations = relations(librariesTable, ({ many }) => ({
    recipes: many(recipesTable)
}));

export const recipesRelations = relations(recipesTable, ({ one }) => ({
    library: one(librariesTable, {
        fields: [recipesTable.library_id],
        references: [librariesTable.id]
    })
}));
