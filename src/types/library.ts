import type { RecipeLight } from './recipe.js';

export interface Library {
    id: string;
    name: string;
    owner_id: string;
    recipes: Array<RecipeLight>;
}

/**
 * ---- Request DTOs ----
 */

export interface CreateLibraryInput {
    name: string;
}

export type UpdateLibraryInput = Partial<CreateLibraryInput>;

export interface LibraryFilters {
    search?: string;
    limit?: number;
}
