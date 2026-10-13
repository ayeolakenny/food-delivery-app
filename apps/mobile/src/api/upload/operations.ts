import { useMutation } from "@tanstack/react-query";
import { UploadFileInput, UploadResponse } from "./types";
import { uploadService } from "./service";

export const useUploadMutation = () => {
  return useMutation<UploadResponse, Error, UploadFileInput>({
    mutationFn: uploadService.upload,
  });
};
