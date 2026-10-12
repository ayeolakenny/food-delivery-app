import { Restaurant } from "@food-delivery/types";
import { fetcher } from "../fetcher";
import { UpdateRestaurantInput } from "./types";

export const restaurantService = {
  myRestaurant: () => {
    return fetcher.get<Restaurant | null>("/restaurant/mine");
  },

  updateRestaurant: async ({id, ...data}: UpdateRestaurantInput) => {
    return fetcher.patch<Restaurant>(`/restaurant/${id}`, data);
  },
};

