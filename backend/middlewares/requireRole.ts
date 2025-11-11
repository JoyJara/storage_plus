import { Request, Response } from 'express';

export const requireRole = (role: string) => {
    return (req: Request, res: Response, next: Function) => {
        if (!req.session.user || req.session.user.role !== role) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};