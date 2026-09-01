import type { Request, Response, NextFunction } from 'express';
import type { CreateLibraryInput, UpdateLibraryInput, LibraryFilters } from '@app-types/library.js';
import { isNonEmptyString, isPositiveNumber } from '@utils/validates.js';
import { BadRequestError } from '@config/app-error.js'

export function validateGetLibraries(req: Request, res: Response, next: NextFunction): void {
    const { search, limit } = req.query as Partial<LibraryFilters>;
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

export function validatePostLibrary(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as Partial<CreateLibraryInput>;
    const errors: Array<string> = [];

    if (!isNonEmptyString(body.name)) {
        errors.push('"name" is required and must be a non-empty string.');
    }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid library payload.', errors));
        return;
    }

    next();
}

export function validatePutLibrary(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as UpdateLibraryInput;
    const errors: Array<string> = [];

    if (Object.keys(body ?? {}).length === 0) {
        errors.push('Request body must contain at least one field to update.');
    }

    if (body.name !== undefined && !isNonEmptyString(body.name)) {
        errors.push('"name" must be a non-empty string when provided.');
    }

    if (errors.length > 0) {
        next(new BadRequestError('Invalid library payload.', errors));
        return;
    }

    next();
}
