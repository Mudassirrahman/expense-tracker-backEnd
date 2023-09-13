// // admin.guard.ts
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserEntity } from 'src/user/entities/user.entity';

// @Injectable()
// export class AdminGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

//     if (!requiredRoles) {
//       return true; // No roles are required, allow access
//     }

//     const { user } = context.switchToHttp().getRequest();

//     if (!(user instanceof UserEntity)) {
//       return false; // If user not found or not of UserEntity type, deny access
//     }

//     return this.matchRoles(requiredRoles, user.role); // Check if user's role matches required roles
//   }

//   // Define a method to check if user role matches required roles
//   private matchRoles(requiredRoles: string[], userRole: string): boolean {
//     // Implement your logic here
//     // Example: Check if the userRole is 'admin'
//     return requiredRoles.includes('admin');
//   }
// }
