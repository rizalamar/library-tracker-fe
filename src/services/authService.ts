import { axiosInstance } from "../config/axiosInstance";
import type { LoginRequest, RegisterRequest } from "../types/auth";

export const authService = {
	login: (data: LoginRequest) => axiosInstance.post("/api/v1/auth/login", data),
	register: (data: RegisterRequest) => axiosInstance.post("/api/v1/auth/register", data),
	getMe: () => axiosInstance.get("/api/v1/users/me"),
	updateProfile: (data: { fullName: string; email: string }) => axiosInstance.put("/api/v1/users/me", data),
	deleteAccount: () => axiosInstance.delete("/api/v1/users/me"),
};
