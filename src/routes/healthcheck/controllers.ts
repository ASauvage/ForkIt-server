import type { Request, Response, NextFunction } from 'express';

export function getHealthcheck(req: Request, res: Response, next: NextFunction): void {
    try {
        res.status(200).json({ message: 'ForkIt-server API is up.'});
    } catch (error) {
        next(error);
    }
}
