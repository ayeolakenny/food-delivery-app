import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  address!: string;

  @IsString()
  cuisineType!: string;

  @IsUUID("4")
  @IsOptional()
  uploadId?: string;
}

export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  cuisineType?: string;

  @IsUUID("4")
  @IsOptional()
  uploadId?: string;

  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;
}
