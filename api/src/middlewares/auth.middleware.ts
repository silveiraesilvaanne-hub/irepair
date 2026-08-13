import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface TokenPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: 'Não autenticado.' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}

export default authMiddleware;