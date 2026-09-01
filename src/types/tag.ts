export interface Tag {
    id: string;
    name: string;
    color: string;
}

/**
 * ---- Request DTOs ----
 */

export interface CreateTagInput {
    name: string;
    color?: string;
}

export type UpdateTagInput = Partial<CreateTagInput>;

export interface TagFilters {
    search?: string;
    limit?: number;
}
