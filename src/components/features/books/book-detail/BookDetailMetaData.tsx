import type { BookResponse } from "../../../../types/book";

interface BookDetailMetaDataProps {
	book: BookResponse;
}

export default function BookDetailMetaData({ book }: BookDetailMetaDataProps) {
	return (
		<div className="grid grid-cols-2 gap-4 p-4 mt-6 bg-gray-50 rounded-xl">
			<div className="">
				<p className="text-[10px] uppercase text-gray-400 font-bold">ISBN</p>
				<p className="text-sm font-medium">{book.isbn}</p>
			</div>
			<div className="">
				<p className="text-[10px] uppercase text-gray-400 font-bold">Publisher</p>
				<p className="text-sm font-medium">{book.publishers.join(", ") || "N/A"}</p>
			</div>
			<div className="">
				<p className="text-[10px] uppercase text-gray-400 font-bold">Published Date</p>
				<p className="text-sm font-medium">{book.publishedDate || "N/A"}</p>
			</div>
			<div className="">
				<p className="text-[10px] uppercase text-gray-400 font-bold">Format</p>
				<p className="text-sm font-medium">{book.physicalFormat || "N/A"}</p>
			</div>
			<div className="">
				<p className="text-[10px] uppercase text-gray-400 font-bold">Pages</p>
				<p className="text-sm font-medium">{book.number_of_pages ? book.number_of_pages : "N/A"}</p>
			</div>
			<div className="">
				<p className="text-[10px] uppercase text-gray-400 font-bold">Availablity</p>
				<p className={`text-sm font-bold ${book.available ? "text-green-600" : "text-red-600"}`}>
					{book.available ? "Available" : "Unavailable"}
				</p>
			</div>
		</div>
	);
}
