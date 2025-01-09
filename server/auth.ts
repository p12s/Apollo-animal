import { Request, Response, NextFunction } from 'express';

const AUTH_TOKEN = '54321-this-is-secret-token';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.substring(7);

  if (token !== AUTH_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}