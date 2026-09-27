import BookCard from "../components/features/books/BookCard";
import { useEffect, useState } from "react";
import { fetchBooks } from "../features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Pagination from "../components/ui/Pagination";
import type { BookResponse } from "../types/book";
import BookDetailModal from "../components/features/books/book-detail/BookDetailModal";
import { fetchMyBooks } from "../features/myBooks/myBookSlice";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import { useSearchParams } from "react-router-dom";
import BookStats from "../components/features/books/stats/BookStats";

export default function Dashboard() {
	const dispatch = useAppDispatch();
	const {
		items: books,
		loading,
		error,
	} = useAppSelector((state) => {
		return state.books;
	});

	const [page, setPage] = useState(0);
	const [selectedBook, setSelectedBook] = useState<BookResponse | null>(null);
	const [searchParams] = useSearchParams();

	const itemsPerPage = 12;
	const paginatedItems = books.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
	const hasMore = (page + 1) * itemsPerPage < books.length;
	const genre = searchParams.get("genre");

	useEffect(() => {
		dispatch(fetchBooks({ page, genre }));
		dispatch(fetchMyBooks());
	}, [dispatch, page, genre]);

	return (
		<div className="flex flex-col min-h-screen px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="grow">
				{/* Header */}
				<div className="flex flex-col items-center mb-8">
					<h1 className="text-3xl font-serif font-black text-gray-900 tracking-tight">
						Read today, lead tomorrow.
					</h1>
				</div>

				<BookStats books={books} />

				{loading ? (
					<Loader message={"Fetching your library..."} />
				) : error ? (
					<ErrorState message={error || ""} onRetry={() => dispatch(fetchBooks({ page }))} />
				) : (
					<div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
						{paginatedItems.map((book) => {
							if (!book || !book.id || !book.title) {
								return null;
							}

							return <BookCard key={book.id} bookDetails={book} onView={() => setSelectedBook(book)} />;
						})}
					</div>
				)}
			</div>

			{/* Pagination Button */}
			<div className="pt-8 mt-auto">
				<Pagination page={page} setPage={setPage} hasMore={hasMore} />
			</div>

			{selectedBook && <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
		</div>
	);
}
