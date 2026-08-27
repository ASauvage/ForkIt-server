import type { Request, Response, NextFunction } from 'express';
import type { CreateIngredientInput, UpdateIngredientInput } from '@app-types/ingredient.js';
import * as ingredientsServices from './services.js';

export async function getIngredients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { search, limit } = req.query;
        const ingredients = await ingredientsServices.findIngredients({
            ...(typeof search === 'string' ? { search } : {}),
            ...(typeof limit === 'number' ? { limit } : {})
        });

        res.status(200).json({ ingredients });
    } catch (error) {
        next(error);
    }
}

export async function getIngredient(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const ingredient = await ingredientsServices.findIngredientById(req.params.id as string);

        res.status(200).json({ ingredient });
    } catch (error) {
        next(error);
    }
}

export async function postIngredient(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const ingredient = await ingredientsServices.createIngredient(req.body as CreateIngredientInput);

        res.status(201).json({ ingredient });
    } catch (error) {
        next(error);
    }
}

export async function putIngredient(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const ingredient = await ingredientsServices.updateIngredient(req.params.id as string, req.body as UpdateIngredientInput);

        res.status(200).json({ ingredient });
    } catch (error) {
        next(error);
    }
}

export async function deleteIngredient(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await ingredientsServices.deleteIngredient(req.params.id as string);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
