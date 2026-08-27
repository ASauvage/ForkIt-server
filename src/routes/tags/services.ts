import { db } from '@db/index.js';
import { tagsTable } from '@db/schemas/tags.js';
import { eq, asc, ilike, and, type SQL } from 'drizzle-orm';
import type { Tag, CreateTagInput, UpdateTagInput, TagFilters } from '@app-types/tag.js';


export async function findTags(filters: TagFilters = {}): Promise<Array<Tag>> {
    const conditions: Array<SQL<unknown>> = [];

    if (filters.search) conditions.push(ilike(tagsTable.name, `%${filters.search}%`));

    const results = await db
        .select()
        .from(tagsTable)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(asc(tagsTable.name))
        .limit(filters.limit ?? 100);

    return results as Array<Tag>;
}

export async function findTagById(id: string): Promise<Tag | null> {
    const results = await db
        .select()
        .from(tagsTable)
        .where(eq(tagsTable.id, id));
    
        return (results[0] as Tag) ?? null;
}

export async function createTag(input: CreateTagInput): Promise<Tag> {
    const inserted = await db
        .insert(tagsTable)
        .values({
            name: input.name,
            color: input.color
        })
        .returning();

    return inserted[0] as Tag;
}

export async function updateTag(id: string, input: UpdateTagInput): Promise<Tag | null> {
    const updatePayload: Record<string, unknown> = {};

    if (input.name !== undefined) updatePayload.name = input.name;
    if (input.color !== undefined) updatePayload.color = input.color;

    const updated = await db
        .update(tagsTable)
        .set(updatePayload)
        .where(eq(tagsTable.id, id))
        .returning();

    return (updated[0] as Tag) ?? null;
}

export async function deleteTag(id: string): Promise<boolean> {
    const deleted = await db
        .delete(tagsTable)
        .where(eq(tagsTable.id, id))
        .returning();
    
    return deleted.length > 0;
}
