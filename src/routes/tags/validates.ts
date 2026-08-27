import type { Request, Response, NextFunction } from 'express';
import type { CreateTagInput, UpdateTagInput, TagFilters } from '@app-types/tag.js';
import { isHexColor, isNonEmptyString, isPositiveNumber } from '@utils/validates.js';
import { BadRequestError } from '@config/app-error.js'

export function validateGetTags(req: Request, res: Response, next: NextFunction): void {
    const { search, limit } = req.query as Partial<TagFilters>;
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

export function validatePostTag(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as Partial<CreateTagInput>;
    const errors: Array<string> = [];

    if (!isNonEmptyString(body.name)) {
        errors.push('"name" is required and must be a non-empty string.');
    }

    if (body.color !== undefined && !isHexColor(body.color)) {
        errors.push('"color" must be a valid hexadecimal color when provided.');
    }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid tag payload.', errors));
        return;
    }

    next();
}

export function validatePutTag(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as UpdateTagInput;
    const errors: Array<string> = [];

    if (Object.keys(body ?? {}).length === 0) {
        errors.push('Request body must contain at least one field to update.');
    }

    if (body.name !== undefined && !isNonEmptyString(body.name)) {
        errors.push('"name" must be a non-empty string when provided.');
    }

    if (body.color !== undefined && !isNonEmptyString(body.color)) {
        errors.push('"color" must be a non-empty string when provided.');
    }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid tag payload.', errors));
        return;
    }

    next();
}
