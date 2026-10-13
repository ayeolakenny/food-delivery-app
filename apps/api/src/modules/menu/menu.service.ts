import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { connectId } from '../../services/prisma/prisma.util';
import { bad } from '../../utils/error.utils';
import { IAuthUser } from '../auth/auth.types';
import { AddCategoryDto } from './menu.types';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async addCategory(data: AddCategoryDto, user: IAuthUser) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { ownerId: user.sub },
    });
    if (!restaurant) bad('Create a restaurant first', 404);

    const nameExists = await this.prisma.menuCategory.findFirst({
      where: { name: data.name, restaurantId: restaurant.id },
    });

    if (nameExists) bad('Category already exists', 403);

    return await this.prisma.menuCategory.create({
      data: {
        name: data.name,
        restaurant: connectId(restaurant.id),
      },
    });
  }

  // async getCategories(restaurantId: string) {
  //   return await this.prisma.menuCategory.findMany({
  //     where: {
  //       restaurantId: restaurantId,
  //     },
  //   });
  // }

  // async updateCategory(
  //   id: string,
  //   restaurantId: string,
  //   dto: UpdateCategoryDto,
  // ) {
  //   const category = await this.prisma.menuCategory.findUnique({
  //     where: { id },
  //   });
  //   if (!category) bad('Category not found', 404);

  //   if (category.restaurantId !== restaurantId) bad('Category not found', 403);

  //   return await this.prisma.menuCategory.update({
  //     where: { id },
  //     data: {
  //       name: dto.name,
  //     },
  //   });
  // }

  // async deleteCategory(id: string, restaurantId: string) {
  //   const category = await this.prisma.menuCategory.findUnique({
  //     where: { id },
  //   });
  //   if (!category) bad('Category not found', 404);

  //   if (category.restaurantId !== restaurantId) bad('Category not found', 403);

  //   await this.prisma.menuCategory.delete({
  //     where: { id },
  //   });

  //   return { message: 'Category deleted' };
  // }

  // async createMenuItem(dto: CreateMenuItemDto, user: IAuthUser) {
  //   const restaurant = await this.prisma.restaurant.findUnique({
  //     where: { ownerId: user.sub },
  //   });

  //   if (!restaurant) bad('Create a restaurant first', 404);

  //   const { categoryId, ...rest } = dto;

  //   return await this.prisma.menuItem.create({
  //     data: {
  //       ...rest,
  //       category: connectId(dto.categoryId),
  //       restaurant: connectId(restaurant.id),
  //     },
  //   });
  // }

  // async getItemsByRestaurant(restaurantId: string) {
  //   return await this.prisma.menuItem.findMany({
  //     where: {
  //       restaurantId,
  //     },
  //   });
  // }

  // async updateMenuItem(
  //   id: string,
  //   restaurantId: string,
  //   dto: UpdateMenuItemDto,
  // ) {
  //   const item = await this.prisma.menuItem.findUnique({
  //     where: { id },
  //   });
  //   if (!item) bad('Item not found', 404);

  //   if (item.restaurantId !== restaurantId) bad('Item not found', 403);

  //   return await this.prisma.menuItem.update({
  //     where: { id },
  //     data: {
  //       name: dto.name,
  //       description: dto.description,
  //       price: dto.price,
  //       imageId: dto.imageId,
  //       isAvailable: dto.isAvailable,
  //     },
  //   });
  // }

  // 	async deleteMenuItem(id: string, restaurantId: string) {
  // 		const item = await this.prisma.menuItem.findUnique({
  // 			where: { id },
  // 		});
  // 		if (!item) bad('Item not found', 404);

  // 		if (item.restaurantId !== restaurantId) bad('Item not found', 403);

  // 		await this.prisma.menuItem.delete({
  // 			where: { id },
  // 		});

  // 		return { message: 'Item deleted' };
  // 	}
}
