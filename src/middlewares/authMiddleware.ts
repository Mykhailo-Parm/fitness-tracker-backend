import { ApiError } from '@src/utils/ApiError';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new ApiError(401, 'Unauthorized'))
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info to the request object
    (req as any).user = decoded;
    next();
  } catch (error) {
    
    return next(new ApiError(401, 'Invalid token'));
  }
}
