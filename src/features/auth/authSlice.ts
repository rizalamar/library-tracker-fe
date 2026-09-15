import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance"; // Pastikan path ini benar
import type { User, AuthState, AuthSuccessPayload } from "../../types/auth"; // Import types

const initialToken = localStorage.getItem("token");
const initialStoredUser = localStorage.getItem("user");
let initialUser: User | null = null;

if (initialStoredUser) {
	const parsedUser = JSON.parse(initialStoredUser);
	initialUser = {
		id: parsedUser.id || parsedUser.username,
		username: parsedUser.username,
		email: parsedUser.email,
		fullName: parsedUser.fullName,
		role: parsedUser.role,
	};
}

const initialState: AuthState = {
	user: initialUser,
	token: initialToken,
	loading: false,
	error: null,
};

export const loginUser = createAsyncThunk(
	"auth/login",
	async (credentials: { username: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/api/v1/auth/login", credentials);
			const { token, username, email, fullName, role } = response.data.data;
			const userPayload: User = {
				id: username,
				username: username,
				email: email,
				fullName: fullName,
				role: role,
			};

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(userPayload));

			return { token, user: userPayload };
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || "Login failed";
			return rejectWithValue(errorMessage);
		}
	}
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (
		credentials: { username: string; fullName: string; email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post("/api/v1/auth/register", credentials);
			const { token, username, fullName, email, role } = response.data.data;

			const userPayload: User = {
				id: username,
				username: username,
				fullName: fullName,
				email: email,
				role: role,
			};

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(userPayload));

			return { token, user: userPayload }; // Mengembalikan payload yang sama dengan login
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message || "Registration failed";
			return rejectWithValue(errorMessage);
		}
	}
);

export const getMyProfile = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get("/api/v1/users/me");
		return response.data.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response?.data.message || "Failed to fetch profile");
	}
});

export const updateProfile = createAsyncThunk(
	"auth/updateProfile",
	async (data: { fullName: string; email: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put("/api/v1/users/me", data);
			return response.data.data as User;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response.data.message || "Failed to update profile");
		}
	}
);

export const deleteAccount = createAsyncThunk("auth/deleteAccount", async (_, { rejectWithValue }) => {
	try {
		await axiosInstance.delete("/api/v1/users/me");
		return null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response.data.message || "Failed to delete account");
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			state.user = null;
			state.token = null;
			state.error = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Login cases
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthSuccessPayload>) => {
				state.loading = false;
				state.token = action.payload.token;
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// Register cases
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthSuccessPayload>) => {
				state.loading = false;
				state.token = action.payload.token;
				state.user = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(getMyProfile.fulfilled, (state, action) => {
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(state.user));
			})
			.addCase(getMyProfile.rejected, (state) => {
				state.user = null;
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			})
			.addCase(deleteAccount.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			});
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
