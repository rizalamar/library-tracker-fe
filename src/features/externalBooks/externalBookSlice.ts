/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthorDetail } from "../../types/book";
import { externalBookService } from "../../services/externalBookService";

interface ExternalBookState {
	popularAuthors: AuthorDetail[];
	loading: boolean;
	error: string | null;
}

const initialState: ExternalBookState = {
	popularAuthors: [],
	loading: false,
	error: null,
};

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
			.addCase(fetchPopularAuthors.fulfilled, (state, action: PayloadAction<AuthorDetail[]>) => {
				state.popularAuthors = action.payload;
				state.loading = false;
			})
			.addCase(fetchPopularAuthors.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchPopularAuthors.pending, (state) => {
				state.loading = true;
				state.error = null;
			});
	},
});

export default externalBooksSlice.reducer;
