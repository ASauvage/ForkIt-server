export interface Ingredient {
    id: string;
    name: string;
}

/**
 * ---- Request DTOs ----
 */

export interface CreateIngredientInput {
    name: string;
}

export type UpdateIngredientInput = Partial<CreateIngredientInput>;

export interface IngredientFilters {
    search?: string;
    limit?: number;
}
