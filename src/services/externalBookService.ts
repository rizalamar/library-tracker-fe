import { axiosInstance } from "../config/axiosInstance";
import type { AuthorDetail, ReadableBookSearchResponse } from "../types/book";

export const externalBookService = {
	searchBooks: async (query: string, page: number = 1, limit: number = 20) => {
		const response = await axiosInstance.get(`/api/v1/external-book/service`, {
			params: {
				q: query,
				page,
				limit,
			},
		});
		return response.data.data as ReadableBookSearchResponse;
	},
	getPopularAuthors: async (limit: number = 20) => {
		const response = await axiosInstance.get(`/api/v1/external-book/authors/popular`, {
			params: { limit },
		});
		return response.data.data as AuthorDetail[];
	},
};
