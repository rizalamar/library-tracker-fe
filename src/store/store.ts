import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import booksReducer from "../features/books/bookSlice";
import myBooksReducer from "../features/myBooks/myBookSlice";
import genreReducer from "../features/books/genreSlice";
import externalBooksReducer from "../features/externalBooks/externalBookSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		books: booksReducer,
		myBooks: myBooksReducer,
		genres: genreReducer,
		externalBooks: externalBooksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
