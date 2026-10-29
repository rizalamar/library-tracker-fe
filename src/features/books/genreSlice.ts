/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Genre } from "../../types/genre";
import { genreService } from "../../services/genreService";

interface GenreState {
	items: Genre[];
	loading: boolean;
	error: string | null;
}

const initialState: GenreState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchGenres = createAsyncThunk("genres/fetchAll", async (_, { rejectWithValue }) => {
	try {
		const response = await genreService.getAll();
		return response.data.data as Genre[];
	} catch (error: any) {
		const errorMessage = error.response?.data?.data || error.message;
		return rejectWithValue(errorMessage);
	}
});

const genreSlice = createSlice({
	name: "genres",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGenres.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGenres.fulfilled, (state, action: PayloadAction<Genre[]>) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchGenres.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default genreSlice.reducer;
