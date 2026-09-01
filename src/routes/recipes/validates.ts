import type { Request, Response, NextFunction } from 'express';
import type { CreateRecipeInput, UpdateRecipeInput, RecipeFilters } from '@app-types/recipe.js';
import { isUuid, isNonEmptyString, isPositiveNumber, isEnumValue } from '@utils/validates.js';
import { BadRequestError } from '@config/app-error.js'

export function validateGetRecipes(req: Request, res: Response, next: NextFunction): void {
    const { search, library_id, tags, ingredients, sort, limit } = req.query as Partial<RecipeFilters>;
    const errors: Array<string> = [];

    if (search !== undefined && !isNonEmptyString(search)) {
        errors.push('"search" must be a non-empty string when provided.');
    }

    if (library_id !== undefined && !isUuid(library_id)) {
        errors.push('"library_id" must be a valid UUID when provided.');
    }

    // if (tags !== undefined && !isNonEmptyString(tags)) {
    //     errors.push('"tags" must be a non-empty array when provided.');
    // }

    // if (ingredients !== undefined && !isNonEmptyString(search)) {
    //     errors.push('"ingredients" must be a non-empty arry when provided.');
    // }

    if (sort !== undefined && !isEnumValue(sort, {name: 'name', created_at: 'created_at', updated_at: 'updated_at'})) {
        errors.push('"sort" must be a one of ("name", "created_at", "updated_at") when provided.');
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

export function validatePostRecipe(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as Partial<CreateRecipeInput>;
    const errors: Array<string> = [];

    if (!isNonEmptyString(body.name)) {
        errors.push('"name" is required and must be a non-empty string.');
    }

    if (!isUuid(body.library_id)) {
        errors.push('"library" is required and must be a valid UUID.');
    }

    if (body.description !== undefined && !isNonEmptyString(body.description)) {
        errors.push('"description" must be a non-empty string when provided.');
    }

    if (body.image_url !== undefined && !isNonEmptyString(body.image_url)) {
        errors.push('"image_url" must be a non-empty string when provided.');
    }

    if (body.prep_time_min !== undefined && !isPositiveNumber(body.prep_time_min)) {
        errors.push('"prep_time_min" must be a positive number when provided.');
    }

    if (body.cook_time_min !== undefined && !isPositiveNumber(body.cook_time_min)) {
        errors.push('"cook_time_min" must be a positive number when provided.');
    }

    if (body.servings !== undefined && !isPositiveNumber(body.servings)) {
        errors.push('"servings" must be a positive number when provided.');
    }

    // if (body.tags !== undefined) {
    //     errors.push('"tags" must be a non-empty array populate with valid UUID when provided.');
    // }

    // if (body.ingredients !== undefined) {
    //     errors.push('"ingredients" is required and must be a non-empty array.');
    // }

    // if (body.steps !== undefined) {
    //     errors.push('"steps" is required and must be a non-empty string.');
    // }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid recipe payload.', errors));
        return;
    }

    next();
}

export function validatePutRecipe(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as UpdateRecipeInput;
    const errors: Array<string> = [];

    if (Object.keys(body ?? {}).length === 0) {
        errors.push('Request body must contain at least one field to update.');
    }

    if (body.name !== undefined && !isNonEmptyString(body.name)) {
        errors.push('"name" must be a non-empty string when provided.');
    }

    if (body.name !== undefined && !isUuid(body.library_id)) {
        errors.push('"library" must be a valid UUID when provided.');
    }

    if (body.description !== undefined && !isNonEmptyString(body.description)) {
        errors.push('"description" must be a non-empty string when provided.');
    }

    if (body.image_url !== undefined && !isNonEmptyString(body.image_url)) {
        errors.push('"image_url" must be a non-empty string when provided.');
    }

    if (body.prep_time_min !== undefined && !isPositiveNumber(body.prep_time_min)) {
        errors.push('"prep_time_min" must be a positive number when provided.');
    }

    if (body.cook_time_min !== undefined && !isPositiveNumber(body.cook_time_min)) {
        errors.push('"cook_time_min" must be a positive number when provided.');
    }

    if (body.servings !== undefined && !isPositiveNumber(body.servings)) {
        errors.push('"servings" must be a positive number when provided.');
    }

    // if (body.tags !== undefined) {
    //     errors.push('"tags" must be a non-empty array populate with valid UUID when provided.');
    // }

    // if (body.ingredients !== undefined) {
    //     errors.push('"ingredients" must be a non-empty array when provided.');
    // }

    // if (body.steps !== undefined) {
    //     errors.push('"steps" must be a non-empty string when provided.');
    // }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid recipe payload.', errors));
        return;
    }

    next();
}
