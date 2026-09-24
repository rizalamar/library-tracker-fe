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
