import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.types';
import { bad } from '../../utils/error.utils';
import { hash, verify } from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existing) bad('Email already in use', 409);

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password),
      },
    });

    return {
      user: this.sanitizeUser(user),
      token: this.generateToken(user),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) bad('Invalid credentials', 401);

    const isMatch = await verify(user.password, dto.password);
    if (!isMatch) bad('Invalid credentials', 401);

    return {
      user: this.sanitizeUser(user),
      token: this.generateToken(user),
    };
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: User) {
    const { password, ...sanitized } = user;
    void password;
    return sanitized;
  }
}
