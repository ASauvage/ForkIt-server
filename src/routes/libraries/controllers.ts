import type { Request, Response, NextFunction } from 'express';
import type { CreateLibraryInput, UpdateLibraryInput } from '@app-types/library.js';
import * as librariesServices from './services.js';

export async function getLibraries(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { search, limit } = req.query;
        const libraries = await librariesServices.findLibraries({
            ...(typeof search === 'string' ? { search } : {}),
            ...(typeof limit === 'number' ? { limit } : {})
        });

        res.status(200).json({ libraries });
    } catch (error) {
        next(error);
    }
}

export async function getLibrary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const library = await librariesServices.findLibraryById(req.params.id as string);

        res.status(200).json({ library });
    } catch (error) {
        next(error);
    }
}

export async function postLibrary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const library = await librariesServices.createLibrary(req.metadata?.user_id, req.body as CreateLibraryInput);

        res.status(201).json({ library });
    } catch (error) {
        next(error);
    }
}

export async function putLibrary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const library = await librariesServices.updateLibrary(req.params.id as string, req.body as UpdateLibraryInput);

        res.status(200).json({ library });
    } catch (error) {
        next(error);
    }
}

export async function deleteLibrary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await librariesServices.deleteLibrary(req.params.id as string);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
