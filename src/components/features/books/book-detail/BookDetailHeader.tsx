import type { BookResponse } from "../../../../types/book";
import { getPrimaryAuthorName } from "../../../../utils/helper";

interface BookDetailHeaderProps {
	book: BookResponse;
}

export default function BookDetailHeader({ book }: BookDetailHeaderProps) {
	return (
		<div className="flex items-start gap-6">
			{/* Cover */}
			<img
				src={book.imageUrl ?? "https://placehold.co/128x192?text=No+Cover&font=Source+Sans+Pro"}
				alt={book.title}
				className="object-cover w-32 h-48 mb-4 rounded-lg shadow-md"
			/>

			{/* Main info */}
			<div className="flex-1">
				<h2 className="mb-2 text-2xl font-bold leading-tight text-gray-900">{book.title}</h2>
				<p className="mt-1 text-sm font-semibold text-blue-600">{getPrimaryAuthorName(book.authors)}</p>
			</div>
		</div>
	);
}
