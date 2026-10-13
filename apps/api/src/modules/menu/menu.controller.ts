import { Body, Controller, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Auth, AuthUser } from '../auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import { AddCategoryDto } from './menu.types';
import type { IAuthUser } from '../auth/auth.types';

@Controller('menu')
export class MenuController {
  constructor(private readonly menu: MenuService) {}

  @Auth([Role.RESTAURANT_OWNER])
  @Post('category')
  async addCategory(@Body() data: AddCategoryDto, @AuthUser() user: IAuthUser) {
    return await this.menu.addCategory(data, user);
  }
}
