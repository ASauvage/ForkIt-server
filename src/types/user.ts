import type { LibraryLight } from "./library.js";
import type { RecipeLight } from "./recipe.js";

export interface UserLight {
    id: string;
    name: string;
    image_url: string;
}

export interface User extends UserLight {
    mail: string;
    permissions: number;
    own_libraries: Array<LibraryLight>;
    own_recipes: Array<RecipeLight>;
}

/**
 * ---- Request DTOs ----
 */

export interface CreateUserInput {
    name: string;
    image_url?: string;
    mail: string;
    password: string;
    permission?: number;
}

export type UpdateUserInput = Partial<CreateUserInput>;

export interface UserFilters {
    search?: string;
    mail?: string;
    limit?: number;
}
