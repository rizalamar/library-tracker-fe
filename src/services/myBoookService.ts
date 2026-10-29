import { axiosInstance } from "../config/axiosInstance";
import type { ReadingStatus } from "../types/myBook";

export const myBookService = {
	getAll: () => axiosInstance.get(`/api/v1/my-books`),
	add: (bookId: string) => axiosInstance.post(`/api/v1/my-books/${bookId}`),
	update: (id: string, data: { status: ReadingStatus; notes: string }) =>
		axiosInstance.put(`/api/v1/my-books/${id}`, data),
	delete: (id: string) => axiosInstance.delete(`/api/v1/my-books/${id}`),
};
