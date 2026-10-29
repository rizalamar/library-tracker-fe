import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState, AuthSuccessPayload } from "../../types/auth";
import { authService } from "../../services/authService";

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
			const response = await authService.login(credentials);
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
			const errorResponse = err.response?.data?.data;
			let errorMessage = "Registration Failed";

			if (typeof errorResponse === "object") {
				errorMessage = Object.values(errorResponse)[0] as string;
			} else if (typeof errorResponse === "string") {
				errorMessage = errorResponse;
			}
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
			const response = await authService.register(credentials);
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
			const errorResponse = err.response?.data?.data;
			let errorMessage = "Registration Failed";

			if (typeof errorResponse === "object") {
				errorMessage = Object.values(errorResponse)[0] as string;
			} else if (typeof errorResponse === "string") {
				errorMessage = errorResponse;
			}
			return rejectWithValue(errorMessage);
		}
	}
);

export const getMyProfile = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
	try {
		const response = await authService.getMe();
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
			const response = await authService.updateProfile(data);
			return response.data.data as User;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response.data.message || "Failed to update profile");
		}
	}
);

export const deleteAccount = createAsyncThunk("auth/deleteAccount", async (_, { rejectWithValue }) => {
	try {
		await authService.deleteAccount();
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

			.addCase(getMyProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getMyProfile.fulfilled, (state, action) => {
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})

			.addCase(getMyProfile.rejected, (state) => {
				state.user = null;
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			})

			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(state.user));
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			.addCase(deleteAccount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteAccount.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				localStorage.removeItem("token");
				localStorage.removeItem("user");
			})
			.addCase(deleteAccount.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
