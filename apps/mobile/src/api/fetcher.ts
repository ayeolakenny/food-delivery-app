import { api } from "./axios";

export const fetcher = {
  get: async <T = any>(url: string, params?: object) => {
    const res = await api.get<T>(url, { params });
    return res.data as T;
  },
  post: async <T = any>(url: string, body?: object) => {
    const res = await api.post<T>(url, body);
    return res.data as T;
  },
  put: async <T = any>(url: string, body?: object) => {
    const res = await api.put<T>(url, body);
    return res.data as T;
  },
  patch: async <T = any>(url: string, body?: object) => {
    const res = await api.patch<T>(url, body);
    return res.data as T;
  },
  del: async <T = any>(url: string) => {
    const res = await api.delete<T>(url);
    return res.data as T;
  },
};
