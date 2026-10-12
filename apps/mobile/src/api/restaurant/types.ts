export interface Restaurant {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  address: string;
  cuisineType: string;
  isOpen: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateRestaurantInput {
  id: string;
  name?: string;
  description?: string | null;
  address?: string;
  cuisineType?: string;
  imageUrl?: string | null;
  isOpen?: boolean;
}
