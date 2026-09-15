import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../../types/book";
import { axiosInstance } from "../../config/axiosInstance";

interface BookState {
	items: Book[];
	loading: boolean;
	error: string | null;
}

const initialState: BookState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page: number = 0, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get(`/api/v1/books?page=${page}&size=12`);
		return response.data.data as Book[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const errorMessage = error.response?.data?.message || error.message || "Failed to fetch books";
		return rejectWithValue(errorMessage);
	}
});

export const addBook = createAsyncThunk("books/addBook", async (bookData: Partial<Book>, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("/api/v1/books", bookData);
		return response.data.data as Book;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || "Failed to add book");
	}
});

export const updateBook = createAsyncThunk(
	"books/updateBook",
	async ({ id, data }: { id: string; data: Partial<Book> }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(`/api/v1/books/${id}`, data);
			return response.data.data as Book;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to update book");
		}
	}
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id: string, { rejectWithValue }) => {
	try {
		await axiosInstance.delete(`/api/v1/books/${id}`);
		return id;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || "Failed to delete book");
	}
});

export const fetchExternalBook = createAsyncThunk("books/fetchExternal", async (isbn: string, { rejectWithValue }) => {
	try {
		const response = await axiosInstance(`/api/v1/external-books/${isbn}`);
		return response.data.data as Book;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	} catch (error: any) {
		return rejectWithValue("No book found in OpenLibrary");
	}
});

const bookSlice = createSlice({
	name: "books",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || "Failed to load books";
			})
			.addCase(addBook.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(updateBook.fulfilled, (state, action) => {
				const index = state.items.findIndex((b) => b.id === action.payload.id);
				if (index !== -1) state.items[index] = action.payload;
			})
			.addCase(deleteBook.fulfilled, (state, action) => {
				state.items = state.items.filter((b) => b.id !== action.payload);
			});
	},
});

export default bookSlice.reducer;
