import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import type { BookResponse } from "../../../types/book";
import { addBook, fetchExternalBook } from "../../../features/books/bookSlice";
import { getPrimaryAuthorName } from "../../../utils/helper";
import Button from "../../ui/Button";
import { toast } from "sonner";

export default function OpenLibrarySearch() {
	const dispatch = useAppDispatch();
	const { items } = useAppSelector((state) => state.books);
	const [isbn, setIsbn] = useState<string>("");
	const [preview, setPreview] = useState<BookResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const isAlreadyAdded = items.some((book) => book.isbn === preview?.isbn);

	const handleSearch = async () => {
		setLoading(true);
		try {
			const action = dispatch(fetchExternalBook(isbn));
			const result = await action.unwrap();
			setPreview(result);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error("No book found for this ISBN.");
		} finally {
			setLoading(false);
		}
	};

	const handleSave = () => {
		if (!preview) return;

		if (isAlreadyAdded) {
			toast.error("This book is already in your dashboard!");
			return;
		}

		dispatch(addBook(preview));
		setPreview(null);
		setIsbn("");
		toast.success(`Book "${preview.title}" added successfully! `);
	};

	return (
		<div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
			<h2 className="mb-4 text-lg font-bold text-gray-900">Add from OpenLibrary</h2>
			<div className="flex gap-3">
				<input
					className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none "
					placeholder="Enter ISBN..."
					value={isbn}
					onChange={(e) => setIsbn(e.target.value)}
				/>
				<Button onClick={handleSearch} disabled={loading} className="font-medium transition-all">
					{loading ? "Searching..." : "Search"}
				</Button>
			</div>

			{preview && (
				<div className="flex items-start gap-4 p-5 mt-6 border border-blue-100 shadow-md bg-blue-50/50 rounded-2xl">
					{preview.imageUrl && (
						<img src={preview.imageUrl} className="object-cover w-20 rounded-lg shadow-sm h-28" />
					)}
					<div className="flex-1">
						<h3 className="text-lg font-bold">{preview.title}</h3>
						<p className="mb-2 text-sm text-gray-600">{getPrimaryAuthorName(preview.authors)}</p>
						<button
							onClick={handleSave}
							disabled={isAlreadyAdded}
							className={`w-full mt-4  text-white px-4 py-2 rounded-lg font-medium transition-all ${
								isAlreadyAdded
									? "bg-gray-500 text-gray-500 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg cursor-pointer"
							}`}
						>
							{isAlreadyAdded ? "Alread addded" : "Add to Dashboard"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
