import type { JwtPayload } from '@food-delivery/types';
import { Role } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';
import type { Request } from 'express';

// The logged-in user as known from the verified JWT (what @AuthUser() injects).
export type IAuthUser = JwtPayload;

// The Express request after JwtAuthGuard has verified the token and attached its payload.
export type AuthenticatedRequest = Request & { user: IAuthUser };

export class RegisterDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(Role)
  role!: Role;
}

export class LoginDto {
  @IsString()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
