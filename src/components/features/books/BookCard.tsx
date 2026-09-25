import type { BookResponse } from "../../../types/book"; // Import Author dan Book type
import type { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { addBookToMyShelf } from "../../../features/myBooks/myBookSlice";
import { getPrimaryAuthorName } from "../../../utils/helper";
import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
interface BookCardProps {
	bookDetails: BookResponse;
	onView: () => void;
}

export function BookCard({ bookDetails, onView }: BookCardProps) {
	const dispatch = useAppDispatch();
	const { items: myBooks } = useAppSelector((state) => state.myBooks);
	const isAlreadyInShelf = myBooks.some((item) => item.book.id === bookDetails.id);

	const handleAddToShelf = async (e: MouseEvent) => {
		try {
			e.stopPropagation();
			await dispatch(addBookToMyShelf(bookDetails.id || "")).unwrap();
			toast.success(`${bookDetails.title} has been added to your shelf!`);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error("Failed to add book. Please try again");
		}
	};

	return (
		<div onClick={onView} className="flex flex-col space-y-3">
			{/* Cover */}
			<div className="relative w-full overflow-hidden transition-transform duration-300 bg-gray-100 shadow-sm cursor-pointer group aspect-2/3 rounded-xl group-hover:-translate-y-1">
				{bookDetails.imageUrl ? (
					<>
						<img
							src={bookDetails.imageUrl}
							alt={`Cover for ${bookDetails.title}`}
							className="absolute inset-0 object-cover w-full h-full scale-110 blur-lg opacity-60"
						/>

						<img
							src={bookDetails.imageUrl}
							alt={`Cover for ${bookDetails.title}`}
							className="relative object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-105"
						/>
					</>
				) : (
					<div className="flex items-center justify-center w-full h-full text-xs text-gray-400 bg-gray-200">
						No Cover
					</div>
				)}
			</div>

			<div className="space-y-2">
				<div className="">
					<h3 className="text-sm font-bold text-gray-900 line-clamp-1">{bookDetails.title}</h3>
					<p className="text-xs text-gray-500 line-clamp-1">{getPrimaryAuthorName(bookDetails.authors)}</p>
				</div>

				<button
					onClick={handleAddToShelf}
					disabled={isAlreadyInShelf}
					title={isAlreadyInShelf ? "In Shelf" : "Add to shelf"}
					className={` w-full flex gap-2 items-center justify-center font-semibold px-4 py-2 rounded-xl text-sm ${
						isAlreadyInShelf
							? "bg-green-500 text-white cursor-default shadow-md shadow-green-200"
							: "bg-blue-500 text-white cursor-pointer shadow-md shadow-blue-200"
					}`}
				>
					{isAlreadyInShelf ? (
						<>
							<BookmarkCheck className="w-5 h-5" />
							<span>In Shelf</span>
						</>
					) : (
						<>
							<BookmarkPlus className="w-5 h-5" />
							<span>Add to shelf</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
}

export default BookCard;
