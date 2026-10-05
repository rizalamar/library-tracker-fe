export interface Author {
	url: string;
	name: string;
}

interface PublisherRequest {
	name: string;
}

export interface BookResponse {
	id: string | null;
	title: string;
	isbn: string;
	description: string | null;
	authors: Author[];
	publishers: string[];
	number_of_pages: number | null;
	physicalFormat: string | null;
	languages: string[];
	publishPlaces: string[];
	subjects: string[];
	subjectsPeople: string[];
	subjectPlaces: string[];
	subjectTimes: string[];
	publishedDate: string | null;
	imageUrl: string | null;
	available: boolean;
	created: string | null;
}

export interface BookRequest {
	title: string;
	authors: Author[];
	isbn: string;
	publishers: PublisherRequest[];
	publishedDate: string;
	imageUrl: string | null;
}

export interface ReadableBook {
	editionKey: string;
	isbn: string;
	title: string;
	authors: string[];
	imageUrl?: string;
	readOnline: string;
	readerUrl: string;
}

export interface ReadableBookSearchResponse {
	query: string;
	page: number;
	limit: number;
	candidateTotal: number;
	hasNextCandidatePage: boolean;
	books: ReadableBook[];
}

export interface AuthorDetail {
	name: string;
	personalName?: string;
	fullerName?: string;
	birthDate?: string;
	bio?: string;
	photos: string[];
	links: {
		url: string;
		title: string;
	}[];
	alternateName: string[];
	topWorks: {
		key: string;
		title: string;
		firstPublishYear: number;
		coverUrl: string;
	}[];
}
