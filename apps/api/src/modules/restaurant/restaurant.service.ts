import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurant.types';
import { IAuthUser } from '../auth/auth.types';
import { bad } from '../../utils/error.utils';
import { connectId } from '../../services/prisma/prisma.util';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRestaurantDto, user: IAuthUser) {
    const existing = await this.prisma.restaurant.findUnique({
      where: {
        ownerId: user.sub,
      },
    });

    if (existing) bad('You already have a restaurant', 403);

    const { uploadId, ...rest } = dto;

    const restaurant = await this.prisma.restaurant.create({
      data: {
        ...rest,
        owner: connectId(user.sub),
        image: uploadId ? connectId(uploadId) : undefined,
      },
    });

    return restaurant;
  }

  async findMine(user: IAuthUser) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        ownerId: user.sub,
      },
    });

    if (!restaurant) bad('You do not have a restaurant', 403);

    return restaurant;
  }

  async findById(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) bad('Restaurant not found', 404);

    return restaurant;
  }

  async findAll() {
    return await this.prisma.restaurant.findMany();
  }

  async update(id: string, dto: UpdateRestaurantDto, user: IAuthUser) {
    const restaurant = await this.findById(id);

    if (restaurant.ownerId !== user.sub) {
      bad('You do not own this restaurant', 403);
    }

    const { uploadId, ...rest } = dto;

    const updated = await this.prisma.restaurant.update({
      where: { id },
      data: {
        ...rest,
        image: uploadId ? connectId(uploadId) : undefined,
      },
    });

    return updated;
  }
}
