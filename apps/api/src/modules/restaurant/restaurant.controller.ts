import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Auth, AuthUser } from '../auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import type { IAuthUser } from '../auth/auth.types';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurant.types';

@Auth()
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurant: RestaurantService) {}

  @Post()
  @Auth([Role.RESTAURANT_OWNER])
  async create(@Body() dto: CreateRestaurantDto, @AuthUser() user: IAuthUser) {
    return this.restaurant.create(dto, user);
  }

  @Get()
  async findAll() {
    return this.restaurant.findAll();
  }

  @Get('mine')
  @Auth([Role.RESTAURANT_OWNER])
  async findMine(@AuthUser() user: IAuthUser) {
    return this.restaurant.findMine(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.restaurant.findById(id);
  }

  @Patch(':id')
  @Auth([Role.RESTAURANT_OWNER])
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRestaurantDto,
    @AuthUser() user: IAuthUser,
  ) {
    return this.restaurant.update(id, dto, user);
  }
}
