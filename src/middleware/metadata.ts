import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

export function responseMetadataMiddleware(req: Request, res: Response, next: NextFunction): void {
    const date: Date = new Date();
    const startTime = process.hrtime.bigint();
    const originalJson = res.json.bind(res);

    req.metadata = {
        request_id: randomUUID(),
        user_id: null,
        current_time: {
            value: date.toISOString(),
            timestamp: Math.floor(date.getTime() / 1000)
        },
        version: "1.0",
        request: {
            method: req.method,
            path: req.originalUrl
        }
    };

    res.json = function (body: unknown): Response {
        const executionTimeMs = Number(process.hrtime.bigint() - startTime) / 1e6;
        const metadata = {
            ...req.metadata,
            execution_time_ms: Math.round(executionTimeMs * 100) / 100,
        };

        if (body && typeof body === 'object' && !Array.isArray(body)) {
            return originalJson({ metadata, ...body });
        }

        return originalJson({ metadata, data: body });
    };

    next();
}
