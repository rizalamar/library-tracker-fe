import type { Author } from "../types/book";

export const getPrimaryAuthorName = (authors: Author[] | undefined): string => {
	if (!Array.isArray(authors) || authors.length === 0) {
		return "Unknown Author";
	}
	return authors.map((author) => author.name).join(", ");
};
