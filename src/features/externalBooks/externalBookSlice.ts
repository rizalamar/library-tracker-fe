/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthorDetail, ReadableBook } from "../../types/book";
import { externalBookService } from "../../services/externalBookService";

interface ExternalBookState {
	searchResults: ReadableBook[];
	popularAuthors: AuthorDetail[];
	loading: boolean;
	error: string | null;
}

const initialState: ExternalBookState = {
	searchResults: [],
	popularAuthors: [],
	loading: false,
	error: null,
};

export const searchExternalBooks = createAsyncThunk(
	"externalBooks/search",
	async ({ query, page }: { query: string; page?: number }, { rejectWithValue }) => {
		try {
			const data = await externalBookService.searchBooks(query, page);
			return data.books;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Search failed");
		}
	}
);

export const fetchPopularAuthors = createAsyncThunk(
	"externalBooks/fetchAuthors",
	async (limit: number = 20, { rejectWithValue }) => {
		try {
			return await externalBookService.getPopularAuthors(limit);
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch authors");
		}
	}
);

const externalBooksSlice = createSlice({
	name: "externalBooks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(searchExternalBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchExternalBooks.fulfilled, (state, action: PayloadAction<ReadableBook[]>) => {
				state.loading = false;
				state.searchResults = action.payload;
			})
			.addCase(searchExternalBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchPopularAuthors.fulfilled, (state, action: PayloadAction<AuthorDetail[]>) => {
				state.popularAuthors = action.payload;
			});
	},
});

export default externalBooksSlice.reducer;
