export interface Author {
	url: string;
	name: string;
}

interface Publisher {
	name: string;
}

export interface Excerpt {
	text: string;
	comment?: string;
}

export interface Book {
	id: string;
	title: string;
	authors: Author[];
	isbn: string;
	subtitle: string | null;
	publishers: Publisher[];
	number_of_pages: number;
	subjects: string[];
	subjectPlaces: string[];
	subjectsPeople: string[];
	subjectTimes: string[];
	excerpts: Excerpt[];
	publishedDate: string;
	imageUrl: string | null;
	available: boolean;
	createdAt: string;
}
