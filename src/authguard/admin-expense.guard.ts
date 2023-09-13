import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable() 
 export class AdminAuthGuard extends AuthGuard('jwt') { 
   canActivate(context: ExecutionContext): boolean { 
     const isAuth = super.canActivate(context); 
     if (!isAuth) { 
       throw new UnauthorizedException('Unauthorized'); 
     } 
  
     const request = context.switchToHttp().getRequest(); 
     const user = request.user; 
  
  
     if (user.role !=='ADMIN') { 
       throw new UnauthorizedException(); 
     } 
  
     return true; 
   } 
 }