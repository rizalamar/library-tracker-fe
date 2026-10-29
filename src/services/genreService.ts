import { axiosInstance } from "../config/axiosInstance";

export const genreService = {
	getAll: () => axiosInstance.get(`/api/v1/genres`),
};
