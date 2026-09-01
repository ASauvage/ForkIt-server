import type { Request, Response, NextFunction } from 'express';
import type { CreateRecipeInput, UpdateRecipeInput } from '@app-types/recipe.js';
import * as recipesServices from './services.js';

export async function getRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { search, limit } = req.query;
        const recipes = await recipesServices.findRecipes({
            ...(typeof search === 'string' ? { search } : {}),
            ...(typeof limit === 'number' ? { limit } : {})
        });

        res.status(200).json({ recipes });
    } catch (error) {
        next(error);
    }
}

export async function getRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const recipe = await recipesServices.findRecipeById(req.params.id as string);

        res.status(200).json({ recipe });
    } catch (error) {
        next(error);
    }
}

export async function postRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const recipe = await recipesServices.createRecipe(req.metadata?.user_id, req.body as CreateRecipeInput);

        res.status(201).json({ recipe });
    } catch (error) {
        next(error);
    }
}

export async function putRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const recipe = await recipesServices.updateRecipe(req.params.id as string, req.body as UpdateRecipeInput);

        res.status(200).json({ recipe });
    } catch (error) {
        next(error);
    }
}

export async function deleteRecipe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await recipesServices.deleteRecipe(req.params.id as string);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
