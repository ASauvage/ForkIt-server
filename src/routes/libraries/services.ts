import { db } from '@db/index.js';
import { librariesTable } from '@db/schemas/libraries.js';
import { eq, asc, ilike, and, type SQL } from 'drizzle-orm';
import type { Library, CreateLibraryInput, UpdateLibraryInput, LibraryFilters } from '@app-types/library.js';

export async function findLibraries(filters: LibraryFilters = {}): Promise<Array<Library>> {
    const conditions: Array<SQL<unknown>> = [];

    if (filters.search) conditions.push(ilike(librariesTable.name, `%${filters.search}%`));

    const results = await db.query.librariesTable.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        orderBy: [asc(librariesTable.name)],
        limit: filters.limit ?? 100,
        with: {
            recipes: {
                orderBy: (recipes, { asc }) => [asc(recipes.name)],
                columns: {
                    id: true,
                    name: true,
                    description: true,
                    image_url: true
                },
                limit: 10
            }
        }
    });

    return results as Array<Library>;
}

export async function findLibraryById(id: string): Promise<Library | null> {
    const results = await db.query.librariesTable.findFirst({
        where: eq(librariesTable.id, id),
        with: {
            recipes: {
                orderBy: (recipes, { asc }) => [asc(recipes.name)],
                columns: {
                    id: true,
                    name: true,
                    description: true,
                    image_url: true
                },
                limit: 100
            }
        }
    });
    
    return (results as Library) ?? null;
}

export async function createLibrary(owner_id: string, input: CreateLibraryInput): Promise<Library> {
    const inserted = await db
        .insert(librariesTable)
        .values({
            name: input.name,
            owner_id
        })
        .returning();

    return inserted[0] as Library;
}

export async function updateLibrary(id: string, input: UpdateLibraryInput): Promise<Library | null> {
    const updatePayload: Record<string, unknown> = {};

    if (input.name !== undefined) updatePayload.name = input.name;

    const updated = await db
        .update(librariesTable)
        .set(updatePayload)
        .where(eq(librariesTable.id, id))
        .returning();

    return (updated[0] as Library) ?? null;
}

export async function deleteLibrary(id: string): Promise<boolean> {
    const deleted = await db
        .delete(librariesTable)
        .where(eq(librariesTable.id, id))
        .returning();
    
    return deleted.length > 0;
}
