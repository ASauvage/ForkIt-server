import type { Request, Response, NextFunction } from 'express';
import type { CreateIngredientInput, UpdateIngredientInput, IngredientFilters } from '@app-types/ingredient.js';
import { isNonEmptyString, isPositiveNumber } from '@utils/validates.js';
import { BadRequestError } from '@config/app-error.js'

export function validateGetIngredients(req: Request, res: Response, next: NextFunction): void {
    const { search, limit } = req.query as Partial<IngredientFilters>;
    const errors: Array<string> = [];

    if (search !== undefined && !isNonEmptyString(search)) {
        errors.push('"search" must be a non-empty string when provided.');
    }

    if (limit !== undefined && !isPositiveNumber(limit)) {
        errors.push('"limit" must be a positive number when provided.');
    }

    if (errors.length > 0) {
        next(new BadRequestError(undefined, errors));
        return;
    }

    next();
}

export function validatePostIngredient(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as Partial<CreateIngredientInput>;
    const errors: Array<string> = [];

    if (!isNonEmptyString(body.name)) {
        errors.push('"name" is required and must be a non-empty string.');
    }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid ingredient payload.', errors));
        return;
    }

    next();
}

export function validatePutIngredient(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as UpdateIngredientInput;
    const errors: Array<string> = [];

    if (Object.keys(body ?? {}).length === 0) {
        errors.push('Request body must contain at least one field to update.');
    }

    if (body.name !== undefined && !isNonEmptyString(body.name)) {
        errors.push('"name" must be a non-empty string when provided.');
    }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid ingredient payload.', errors));
        return;
    }

    next();
}
