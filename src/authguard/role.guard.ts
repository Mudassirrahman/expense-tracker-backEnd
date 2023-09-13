import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // No roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user; // Assuming you attach the user to the request

    if (!user) {
      return false; // No user found, deny access
    }

    return this.matchRoles(requiredRoles, user.role); // Check if user's role matches required roles
  }

  // Define a method to check if user role matches required roles
  private matchRoles(requiredRoles: string[], userRole: string): boolean {
    return requiredRoles.includes(userRole);
  }
}
