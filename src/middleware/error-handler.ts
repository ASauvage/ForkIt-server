import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@config/app-error.js';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if (res.headersSent) {
        next(err);
        return;
    }

    const isAppError = err instanceof AppError;
    const statusCode = isAppError ? err.statusCode : 500;
    const message = isAppError ? err.message : 'Internal server error';

    // log unexpected (non-operational) errors loudly, expected ones quietly
    if (!isAppError || !err.isOperational) {
        console.error('[Unhandled error]', err);
    } else {
        console.warn(`[${statusCode}] ${req.method} ${req.originalUrl} — ${err.message}`);
    }

    res.status(statusCode).json({
        error: {
            message,
            ...(isAppError && err.details ? { details: err.details } : {}),
            ...(process.env.NODE_ENV !== 'production' && err instanceof Error ? { stack: err.stack } : {})
        }
    });
}

export function notFoundHandler(req: Request, res: Response): void {
    res.status(404).json({
        error: { message: `Route ${req.method} ${req.originalUrl} not found` }
    });
}
