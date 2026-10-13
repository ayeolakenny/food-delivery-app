import { fetcher } from "../fetcher";
import { Category, AddCategoryInput } from "./types";

export const menuService = {
  addCategory: async (data: AddCategoryInput) => {
    return await fetcher.post<Category>("/menu/category", data);
  },
};
