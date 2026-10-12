import { useMutation, useQuery } from "@tanstack/react-query";
import { Restaurant, UpdateRestaurantInput } from "./types";
import { restaurantService } from "./service";
import { queryClient } from "../client";

export const useMyRestaurantQuery = () => {
  return useQuery<Restaurant | null>({
    queryKey: ["my-restaurant"],
    queryFn: () => restaurantService.myRestaurant(),
  });
};

export const useUpdateRestaurantMutation = () => {
  return useMutation<Restaurant, Error, UpdateRestaurantInput>({
    mutationFn: restaurantService.updateRestaurant,
    onSuccess: (updated) => {
      queryClient.setQueryData(["my-restaurant"], updated);
    },
  });
};
