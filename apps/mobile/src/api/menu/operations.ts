import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../client";
import { Category, AddCategoryInput } from "./types";
import { menuService } from "./service";

export const useAddCategoryMutation = () => {
  return useMutation<Category, Error, AddCategoryInput>({
    mutationFn: menuService.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
