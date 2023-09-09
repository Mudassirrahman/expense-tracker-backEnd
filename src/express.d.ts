// express.d.ts
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';

declare module 'express' {
  interface Request extends ExpressRequest {
    user: any; // You can replace 'any' with the actual user type if you have one
  }
  interface Response extends ExpressResponse {}
  interface NextFunction extends ExpressNextFunction {}
}
