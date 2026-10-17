import { axiosInstance } from "../config/axiosInstance";
import type { AuthorDetail } from "../types/book";

export const externalBookService = {
	getPopularAuthors: async (limit: number = 20) => {
		const response = await axiosInstance.get(`/api/v1/external-books/authors/popular`, {
			params: { limit },
		});
		return response.data.data as AuthorDetail[];
	},
};
