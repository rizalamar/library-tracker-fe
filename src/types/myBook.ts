import type { Book } from "./book";

export type ReadingStatus = "UNREAD" | "READING" | "COMPLETED";

export interface MyBook {
	id: string;
	book: Book;
	status: ReadingStatus;
	notes: string | null;
	createdAt: string;
}
