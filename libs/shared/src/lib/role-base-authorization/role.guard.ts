import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './role.decorator';
 
@Injectable()
export class RoleBaseGuardsGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
 
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
 
    console.log(requiredRoles);
 
    if (!requiredRoles) {
      return true;
    }
 
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
 
    console.log(authHeader);
 
    if (!authHeader) {
      throw new UnauthorizedException('JWT token missing!');
    }
 
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('JWT token missing!');
    }
 
    let decoded: any;
    try {
      decoded = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT token');
    }
    request.user = decoded;
    const hasRole = requiredRoles.some((role) => decoded.role === role);
    if (!hasRole) {
      throw new UnauthorizedException("You don't have access to this route");
    }
 
    return true;
  }
}

// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { ROLES_KEY } from './role.decorator';
 
// @Injectable()
// export class RoleBaseGuardsGuard implements CanActivate {
//   constructor(private reflector: Reflector, private jwtService: JwtService) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
 
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers['authorization'];
//     console.log(authHeader,'authHeader');
//     // If no roles required, allow access (but still try to attach user if token exists)
//     if (!requiredRoles) {
//       if (authHeader) {
//         try {
//           const token = authHeader.split(' ')[1];
//           const decoded = this.jwtService.verify(token);
//           request.user = {
//             userId: decoded.sub || decoded.userId,
//             email: decoded.email,
//             role: decoded.role,
//           };
//         } catch{}
//       }
//       return true;
//     }
 
//     if (!authHeader) {
//       throw new UnauthorizedException('Jwt token missing!');
//     }
 
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       throw new UnauthorizedException('JWT token missing!');
//     }

//     let decoded: any;
//     try {
//       decoded = this.jwtService.verify(token);
//     } catch (err) {
//       console.error('JWT verification error:', err);
//       throw new UnauthorizedException('Invalid or expired JWT token');
//     }

//     request.user = {
//       userId: decoded.sub || decoded.userId,
//       email: decoded.email,
//       role: decoded.role,
//     };
 
//     const hasRole = requiredRoles.some((role) => decoded.role === role);
   
//     if (!hasRole) {
//       throw new ForbiddenException(
//         `You do not have permission to access this resource. Required role: ${requiredRoles.join(' or ')}`
//       );
//     }
 
//     return true;
//   }
// }