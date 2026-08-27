import type { Ingredient } from './ingredient.js';
import type { Tag } from './tag.js';

export interface RecipeIngredient {
    ingredient: Ingredient;
    quantity: number;
    unit: string | null;
    notes: string | null;
}

export interface RecipeStep {
    index: number;
    instruction: string;
}

export interface Recipe {
    id: string;
    name: string;
    owner_id: string;
    library_id: string;
    description: string | null;
    image_url: string | null;
    prep_time_min: number | null;
    cook_time_min: number | null;
    servings: number | null;
    created_at: Date;
    updated_at: Date;
    tags: Array<Tag>;
    ingredients: Array<RecipeIngredient>
    steps: Array<RecipeStep>
}

/**
 * ---- Request DTOs ----
 */

export interface CreateRecipeIngredientInput {
    id: string;
    quantity: number;
    unit: string | null;
    notes: string | null;
}

export interface CreateRecipeInput {
    name: string;
    library_id: string;
    description?: string;
    image_url?: string;
    prep_time_min?: number;
    cook_time_min?: number;
    servings?: number;
    tags?: Array<string>;
    ingredients: Array<CreateRecipeIngredientInput>;
    steps: Array<string>;
}

export type UpdateRecipeInput = Partial<CreateRecipeInput>;

export interface RecipeFilters {
    search?: string;
    library_id?: string;
    servings?: number;
    tags: Array<string>;
    ingredients: Array<string>;
    sort?: 'name' | 'created_at' | 'updated_at';
    limit?: number;
}
