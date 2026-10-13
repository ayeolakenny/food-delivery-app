import { fetcher } from "../fetcher";
import { UploadFileInput, UploadResponse } from "./types";

export const uploadService = {
  upload: async ({ uri, fileName, mimeType }: UploadFileInput) => {
    const formData = new FormData();

    // "file" must match FileInterceptor('file') in the API's upload controller.
    // React Native's FormData takes a { uri, name, type } object instead of a Blob.
    formData.append("file", {
      uri,
      name: fileName ?? uri.split("/").pop() ?? "upload.jpg",
      type: mimeType ?? "image/jpeg",
    } as any);

    // Override the instance's JSON default, otherwise axios serializes the FormData to JSON.
    return fetcher.post<UploadResponse>("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getUploadUrl: (id: string) => `${process.env.EXPO_PUBLIC_API_URL}/upload/${id}`
};
