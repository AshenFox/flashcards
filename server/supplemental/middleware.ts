import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';
import { NextFunction, Request, Response } from 'express';

/* declare module 'express' {
  export interface Request {
    user?: {
      server_id: string;
    };
  }
} */

declare global {
  namespace Express {
    export interface Request {
      user: {
        server_id: string;
      };
    }
  }
}

type TAuthMiddleRes = Response<{ msg: string }>;

const auth = (req: Request, res: TAuthMiddleRes, next: NextFunction) => {
  // Get token fron headers
  const header = req.header('Authorization');
  const token = header && header.split(' ')[1];

  if (!header || !token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')) as JwtPayload;

    req.user = { server_id: decoded.id };

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Tokenis not valid' });
  }
};

export default { auth };
