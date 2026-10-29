export interface User {
	id: string;
	username: string;
	email: string;
	fullName: string;
	role: "USER" | "ADMIN";
}

export interface AuthState {
	user: User | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

export interface AuthSuccessPayload {
	token: string;
	user: User;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	fullName: string;
	email: string;
	password: string;
}
