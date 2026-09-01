import { db } from '@db/index.js';
import { eq, asc, ilike, and, type SQL } from 'drizzle-orm';
import { recipesTable } from '@db/schemas/recipes.js';
import type { Recipe, CreateRecipeInput, UpdateRecipeInput, RecipeFilters } from '@app-types/recipe.js';

export async function findRecipes(filters: RecipeFilters = {}): Promise<Array<Recipe>> {
    const conditions: Array<SQL<unknown>> = [];

    if (filters.search) conditions.push(ilike(recipesTable.name, `%${filters.search}%`));

    const results = await db.query.recipesTable.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: [asc(recipesTable.name)],
        limit: filters.limit ?? 100,
        columns: {
            library_id: false,
        },
        with: {
            recipes_to_tags: {
                columns: {},
                with: {
                    tag: true
                }
            },
            ingredients: {
                columns: {
                    quantity: true,
                    unit: true,
                    notes: true
                },
                with: {
                    ingredient: true
                }
            },
            library: {
                columns: {
                    id: true,
                    name: true
                }
            }
        }
    });

    const recipes = results.map(({ recipes_to_tags, ...recipe }) => ({
        ...recipe,
        tags: recipes_to_tags.map((rt) => rt.tag)
    }));

    return recipes as Array<Recipe>;
}

export async function findRecipeById(id: string): Promise<Recipe | null> {
    const result = await db.query.recipesTable.findFirst({
        where: eq(recipesTable.id, id),
        columns: {
            library_id: false,
        },
        with: {
            recipes_to_tags: {
                columns: {},
                with: {
                    tag: true
                }
            },
            ingredients: {
                columns: {
                    quantity: true,
                    unit: true,
                    notes: true
                },
                with: {
                    ingredient: true
                }
            },
            library: {
                columns: {
                    id: true,
                    name: true
                }
            }
        }
    });

    if (!result) return null;

    const { recipes_to_tags, ...rawRecipe } = result;

    const recipe = {
        ...rawRecipe,
        tags: result.recipes_to_tags.map((rt) => rt.tag)
    };
    
    return (recipe as Recipe) ?? null;
}

export async function createRecipe(owner_id: string, input: CreateRecipeInput): Promise<Recipe> {
    const inserted = await db
        .insert(recipesTable)
        .values({
            name: input.name,
            owner_id
        })
        .returning();

    return inserted[0] as Recipe;
}

export async function updateRecipe(id: string, input: UpdateRecipeInput): Promise<Recipe | null> {
    const updatePayload: Record<string, unknown> = {};

    if (input.name !== undefined) updatePayload.name = input.name;

    const updated = await db
        .update(recipesTable)
        .set(updatePayload)
        .where(eq(recipesTable.id, id))
        .returning();

    return (updated[0] as Recipe) ?? null;
}

export async function deleteRecipe(id: string): Promise<boolean> {
    const deleted = await db
        .delete(recipesTable)
        .where(eq(recipesTable.id, id))
        .returning();
    
    return deleted.length > 0;
}
