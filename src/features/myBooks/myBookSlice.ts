import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MyBook, ReadingStatus } from "../../types/myBook";
import { myBookService } from "../../services/myBoookService";
import { bookService } from "../../services/bookService";

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
		const response = await myBookService.getAll();
		return response.data.data as MyBook[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || "Failed to fetch personal library");
	}
});

export const updateMyBookStatus = createAsyncThunk(
	"myBooks/update",
	async (
		{ myBookId, status, notes }: { myBookId: string; status: ReadingStatus; notes: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await myBookService.update(myBookId, { status, notes });
			return response.data.data as MyBook;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || "Failed to update book");
		}
	}
);

export const addBookToMyShelf = createAsyncThunk("myBooks/add", async (bookId: string, { rejectWithValue }) => {
	try {
		const response = await myBookService.add(bookId);
		return response.data.data as MyBook;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Full error detail:", error.response);
		return rejectWithValue(error.response?.data?.data);
	}
});

export const removeFromShelf = createAsyncThunk("myBooks/remove", async (myBookId: string, { rejectWithValue }) => {
	try {
		await bookService.delete(myBookId);
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

			.addCase(updateMyBookStatus.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateMyBookStatus.fulfilled, (state, action: PayloadAction<MyBook>) => {
				const index = state.items.findIndex((item) => item.id === action.payload.id);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			})
			.addCase(updateMyBookStatus.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			.addCase(addBookToMyShelf.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addBookToMyShelf.fulfilled, (state, action: PayloadAction<MyBook>) => {
				state.items.push(action.payload);
			})
			.addCase(addBookToMyShelf.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			.addCase(removeFromShelf.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeFromShelf.fulfilled, (state, action: PayloadAction<string>) => {
				state.items = state.items.filter((item) => item.id !== action.payload);
			})
			.addCase(removeFromShelf.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default myBookSlice.reducer;
