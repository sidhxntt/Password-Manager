import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.JWT_SECRET as string;

interface JwtPayload {
  sub: string;
  first_name: string;
  last_name: string;
  full_name: string;
  primary_email: string;
  profile_pic: string;
  createdAt: number;
  updatedAt: number;
}

// Extend the Request interface to include the user property
interface UserReq extends Request {
  user?: JwtPayload;
}

const decryptJWT = (req: UserReq, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default decryptJWT;
export type {JwtPayload}
