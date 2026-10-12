import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { bad } from '../../../utils/error.utils';
import type { AuthenticatedRequest, IAuthUser } from '../auth.types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authHeader = request.headers['authorization'];
    if (!authHeader) bad('No token provided', 401);

    const token = authHeader.split(' ')[1];
    if (!token) bad('Invalid token format', 401);

    try {
      const payload = this.jwtService.verify<IAuthUser>(token);
      request.user = payload;
      return true;
    } catch {
      bad('Invalid or expired token', 401);
    }
  }
}
