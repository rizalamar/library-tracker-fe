import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MyBook, ReadingStatus } from "../../types/myBook";
import { axiosInstance } from "../../config/axiosInstance";

interface MyBookState {
	items: MyBook[];
	loading: boolean;
	error: string | null;
}

const initialState: MyBookState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchMyBooks = createAsyncThunk("myBooks/fetchAll", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get("/api/v1/my-books");
		return response.data.data as MyBook[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || "Failed to fetch personal library");
	}
});

export const updateMyBookStatus = createAsyncThunk(
	"myBooks/update",
	async (
		{ myBookId, status, notes }: { myBookId: string; status: ReadingStatus; notes: string | null },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.put(`/api/v1/my-books/${myBookId}`, { status, notes });
			return response.data.data as MyBook;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to update book");
		}
	}
);

export const addBookToMyShelf = createAsyncThunk("myBooks/add", async (bookId: string, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post(`/api/v1/my-books/${bookId}`, {});
		return response.data.data as MyBook;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Full error detail:", error.response);
		return rejectWithValue(error.response?.data?.message || "Failed to add book");
	}
});

export const removeFromShelf = createAsyncThunk("myBooks/remove", async (myBookId: string, { rejectWithValue }) => {
	try {
		await axiosInstance.delete(`/api/v1/my-books/${myBookId}`);
		return myBookId;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || "Failed to remove book");
	}
});

const myBookSlice = createSlice({
	name: "myBooks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMyBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMyBooks.fulfilled, (state, action: PayloadAction<MyBook[]>) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchMyBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updateMyBookStatus.fulfilled, (state, action: PayloadAction<MyBook>) => {
				const index = state.items.findIndex((item) => item.id === action.payload.id);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			})
			.addCase(addBookToMyShelf.fulfilled, (state, action: PayloadAction<MyBook>) => {
				state.items.push(action.payload);
			})
			.addCase(removeFromShelf.fulfilled, (state, action: PayloadAction<string>) => {
				state.items = state.items.filter((item) => item.id !== action.payload);
			});
	},
});

export default myBookSlice.reducer;
