// Same field names as an expo-image-picker asset, so an asset can be passed straight in.
export interface UploadFileInput {
  uri: string;
  fileName?: string | null;
  mimeType?: string | null;
}

export interface UploadResponse {
  id: string;
}
