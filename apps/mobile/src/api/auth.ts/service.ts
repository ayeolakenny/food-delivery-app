import { fetcher } from "../fetcher";
import { AuthResponse, LoginInput, RegisterInput } from "./types";

export const authService = {
  register: async (data: RegisterInput) => {
    return await fetcher.post<AuthResponse>("/auth/register", data);
  },

  login: async (data: LoginInput) => {
    return await fetcher.post<AuthResponse>("/auth/login", data);
  },
};
