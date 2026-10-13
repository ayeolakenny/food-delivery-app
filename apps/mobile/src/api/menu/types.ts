export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  restaurantId: string;
}

export interface AddCategoryInput {
  name: string;
}
