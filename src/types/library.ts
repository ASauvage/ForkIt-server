import type { RecipeLight } from './recipe.js';

export interface LibraryLight {
    id: string;
    name: string;
}

export interface Library extends LibraryLight {
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
