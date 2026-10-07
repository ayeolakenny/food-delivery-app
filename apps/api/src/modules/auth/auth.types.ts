import { Role } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';

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
