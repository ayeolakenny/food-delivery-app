export enum UserRole {
  CUSTOMER = "CUSTOMER",
  RESTAURANT_OWNER = "RESTAURANT_OWNER",
  DRIVER = "DRIVER",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: Date;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string | null;
  imageId: string | null;
  address: string;
  cuisineType: string;
  isOpen: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
