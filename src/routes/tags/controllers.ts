import type { Request, Response, NextFunction } from 'express';
import type { CreateTagInput, UpdateTagInput } from '@app-types/tag.js';
import * as tagsServices from './services.js';

export async function getTags(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { search, limit } = req.query;
        const tags = await tagsServices.findTags({
            ...(typeof search === 'string' ? { search } : {}),
            ...(typeof limit === 'number' ? { limit } : {})
        });

        res.status(200).json({ tags });
    } catch (error) {
        next(error);
    }
}

export async function getTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tag = await tagsServices.findTagById(req.params.id as string);

        res.status(200).json({ tag });
    } catch (error) {
        next(error);
    }
}

export async function postTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tag = await tagsServices.createTag(req.body as CreateTagInput);

        res.status(201).json({ tag });
    } catch (error) {
        next(error);
    }
}

export async function putTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tag = await tagsServices.updateTag(req.params.id as string, req.body as UpdateTagInput);

        res.status(200).json({ tag });
    } catch (error) {
        next(error);
    }
}

export async function deleteTag(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await tagsServices.deleteTag(req.params.id as string);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
