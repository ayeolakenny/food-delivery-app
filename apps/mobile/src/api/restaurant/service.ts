import { Restaurant } from "@food-delivery/types";
import { fetcher } from "../fetcher";
import { CreateRestaurantInput, UpdateRestaurantInput } from "./types";

export const restaurantService = {
  myRestaurant: () => {
    return fetcher.get<Restaurant | null>("/restaurant/mine");
  },

  updateRestaurant: async ({id, ...data}: UpdateRestaurantInput) => {
    return fetcher.patch<Restaurant>(`/restaurant/${id}`, data);
  },

  createRestaurant: async (data: CreateRestaurantInput) => {
    return await fetcher.post<Restaurant>("/restaurant", data);
  },
};

