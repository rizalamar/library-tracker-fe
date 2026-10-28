import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookRequest, BookResponse } from "../../types/book";
import { axiosInstance } from "../../config/axiosInstance";
import { bookService } from "../../services/bookService";

interface BookState {
	items: BookResponse[];
	loading: boolean;
	error: string | null;
}

const initialState: BookState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchBooks = createAsyncThunk(
	"books/fetchBooks",
	async ({ page = 0, genre }: { page?: number; genre?: string | null }, { rejectWithValue }) => {
		try {
			const response = await bookService.getAll({ page, genre });
			return response.data.data as BookResponse[];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const errorMessage = error.response?.data?.data;
			return rejectWithValue(errorMessage);
		}
	}
);

export const addBook = createAsyncThunk(
	"books/addBook",
	async (bookData: Partial<BookResponse>, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/api/v1/books", bookData);
			return response.data.data as BookResponse;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.data || "Failed to add book");
		}
	}
);

export const updateBook = createAsyncThunk(
	"books/updateBook",
	async ({ id, data }: { id: string; data: BookRequest }, { rejectWithValue }) => {
		try {
			const response = await bookService.update(id, data);
			return response.data.data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.data);
		}
	}
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id: string, { rejectWithValue }) => {
	try {
		await bookService.delete(id);
		return id;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.data);
	}
});

export const fetchExternalBook = createAsyncThunk("books/fetchExternal", async (isbn: string, { rejectWithValue }) => {
	try {
		const response = await bookService.getByIsbn(isbn);
		return response.data.data;
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
			.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BookResponse[]>) => {
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
