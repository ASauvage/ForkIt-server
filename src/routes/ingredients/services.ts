import { db } from '@db/index.js';
import { ingredientsTable } from '@db/schemas/ingredients.js';
import { eq, asc, ilike, and, type SQL } from 'drizzle-orm';
import type { Ingredient, CreateIngredientInput, UpdateIngredientInput, IngredientFilters } from '@app-types/ingredient.js';


export async function findIngredients(filters: IngredientFilters = {}): Promise<Array<Ingredient>> {
    const conditions: Array<SQL<unknown>> = [];

    if (filters.search) conditions.push(ilike(ingredientsTable.name, `%${filters.search}%`));

    const results = await db
        .select()
        .from(ingredientsTable)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(asc(ingredientsTable.name))
        .limit(filters.limit ?? 100);

    return results as Array<Ingredient>;
}

export async function findIngredientById(id: string): Promise<Ingredient | null> {
    const results = await db
        .select()
        .from(ingredientsTable)
        .where(eq(ingredientsTable.id, id));
    
        return (results[0] as Ingredient) ?? null;
}

export async function createIngredient(input: CreateIngredientInput): Promise<Ingredient> {
    const inserted = await db
        .insert(ingredientsTable)
        .values({
            name: input.name
        })
        .returning();

    return inserted[0] as Ingredient;
}

export async function updateIngredient(id: string, input: UpdateIngredientInput): Promise<Ingredient | null> {
    const updatePayload: Record<string, unknown> = {};

    if (input.name !== undefined) updatePayload.name = input.name;

    const updated = await db
        .update(ingredientsTable)
        .set(updatePayload)
        .where(eq(ingredientsTable.id, id))
        .returning();

    return (updated[0] as Ingredient) ?? null;
}

export async function deleteIngredient(id: string): Promise<boolean> {
    const deleted = await db
        .delete(ingredientsTable)
        .where(eq(ingredientsTable.id, id))
        .returning();
    
    return deleted.length > 0;
}
