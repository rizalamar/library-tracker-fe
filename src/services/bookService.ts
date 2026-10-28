import { axiosInstance } from "../config/axiosInstance";
import type { BookRequest } from "../types/book";

export const bookService = {
	getAll: (params: { page?: number; genre?: string | null }) => axiosInstance.get(`/api/v1/books`, { params }),
	getById: (id: string) => axiosInstance.get(`/api/v1/books/${id}`),
	getByIsbn: (isbn: string) => axiosInstance.get(`/api/v1/external-books/${isbn}`),
	create: (data: BookRequest) => axiosInstance.post(`/api/v1/books`, data),
	update: (id: string, data: BookRequest) => axiosInstance.put(`/api/v1/books/${id}`, data),
	delete: (id: string) => axiosInstance.delete(`/api/v1/books/${id}`),
};
