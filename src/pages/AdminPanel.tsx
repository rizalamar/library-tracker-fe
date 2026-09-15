import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deleteBook, fetchBooks } from "../features/books/bookSlice";
import OpenLibrarySearch from "../components/features/books/OpenLibrarySearch";
import Pagination from "../components/ui/Pagination";
import { toast } from "sonner";
import Loader from "../components/common/Loader";
import ConfirmModal from "../components/common/ConfirmModal";

export default function AdminPanel() {
	const dispatch = useAppDispatch();
	const { items, loading } = useAppSelector((state) => state.books);

	const [page, setPage] = useState(0);
	const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

	const itemsPerPage = 10;
	const paginatedItems = items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
	const hasMore = (page + 1) * itemsPerPage < items.length;

	useEffect(() => {
		dispatch(fetchBooks(page));
	}, [dispatch, page]);

	const handleDelete = async (id: string) => {
		if (!deleteTarget) return;
		try {
			await dispatch(deleteBook(id)).unwrap();
			toast.success("Book deleted!");
			setDeleteTarget(null);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : String(error));
		}
	};

	return (
		<div className="flex flex-col min-h-screen px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="grow">
				<div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
					<div className="">
						<h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
						<p className="mt-1 text-gray-500">Manage library and external sources.</p>
					</div>
				</div>

				<OpenLibrarySearch />

				<div className="mt-8 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
					<div className="flex items-center justify-between p-6 border-b border-gray-100">
						<h2 className="text-xl font-semibold">Local Database Books</h2>
						<span className="px-3 py-1 text-xs font-bold uppercase bg-gray-100 rounded-full">
							{items.length} Total
						</span>
					</div>

					{loading ? (
						<Loader message="Loading books..." />
					) : (
						<table className="w-full text-left border-collapse">
							<thead className="bg-gray-50">
								<tr className="text-gray-500 uppercase text-[10px] tracking-wider font-bold">
									<th className="p-4">#</th>
									<th className="p-4">Title</th>
									<th className="p-4 text-center">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{paginatedItems.map((book, idx) => (
									<tr key={book.id} className="transition-colors hover:bg-gray-50">
										<td className="p-4">{idx + 1}</td>
										<td className="p-4">{book.title}</td>
										<td className="p-4 text-center">
											<button
												className="text-sm font-medium text-red-500 cursor-pointer hover:text-red-700"
												onClick={() => setDeleteTarget(book.id)}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				<ConfirmModal
					isOpen={!!deleteTarget}
					onClose={() => setDeleteTarget(null)}
					onConfirm={() => {
						if (deleteTarget) handleDelete(deleteTarget);
					}}
					title={"Delete Book"}
					message={"Are you sure you want to delete this book?"}
				/>

				{/* Pagination Button */}
				<div className="pt-8 mt-auto">
					<Pagination page={page} setPage={setPage} hasMore={hasMore} />
				</div>
			</div>
		</div>
	);
}
