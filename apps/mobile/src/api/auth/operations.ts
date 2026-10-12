import { useMutation } from "@tanstack/react-query";
import { AuthResponse, LoginInput, RegisterInput } from "./types";
import { authService } from "./service";
import { queryClient } from "../client";

export const useRegisterMutation = () => {
  return useMutation<AuthResponse, Error, RegisterInput>({
    mutationFn: authService.register,
  });
};

export const useLoginMutation = () => {
  return useMutation<AuthResponse, Error, LoginInput>({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
