// admin-access.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminAccessMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user; // Assuming you've attached the user to the request object in your authentication middleware

    if (user && user.role === 'admin') {
      next(); // User is an admin, proceed to the route handler
    } else {
      // User is not an admin, deny access
      res.status(403).json({ message: 'Access forbidden' });
    }
  }
}
