import type { RecipeLight } from './recipe.js';
import type { UserLight } from "./user.js";

export interface LibraryLight {
    id: string;
    name: string;
}

export interface Library extends LibraryLight {
    owner: UserLight;
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
