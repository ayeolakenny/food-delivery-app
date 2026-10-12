import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import type { AuthenticatedRequest, IAuthUser } from '../auth.types';
import { Role } from '@prisma/client';
import { Roles } from './role.decorator';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (roles?: Role[]) => {
  if (!roles?.length) return applyDecorators(UseGuards(JwtAuthGuard));
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
};

// Only valid on routes protected by @Auth(), which is what sets request.user.
export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): IAuthUser => {
    return ctx.switchToHttp().getRequest<AuthenticatedRequest>().user;
  },
);
