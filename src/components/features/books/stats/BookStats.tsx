import type { BookResponse } from "../../../../types/book";

interface BookStatsProps {
	books: BookResponse[];
}

export default function BookStats({ books }: BookStatsProps) {
	return (
		<div className="flex items-center gap-2 mb-6">
			<span className="px-3 py-1 text-xs font-bold text-blue-700 uppercase rounded-full bg-blue-50">
				{books.length} Total Books Available
			</span>
		</div>
	);
}
