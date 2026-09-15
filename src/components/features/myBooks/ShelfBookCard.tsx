/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BookOpen, CheckCircle, Bookmark, Edit, Trash } from "lucide-react";
import { useAppDispatch } from "../../../hooks/redux";
import type { ReadingStatus, MyBook } from "../../../types/myBook";
import { removeFromShelf, updateMyBookStatus } from "../../../features/myBooks/myBookSlice";
import { getPrimaryAuthorName } from "../../../utils/helper";
import { toast } from "sonner";
import ConfirmModal from "../../common/ConfirmModal";
import Button from "../../ui/Button";

interface MyBookProps {
	myBook: MyBook;
}

export default function ShelfBookCard({ myBook }: MyBookProps) {
	const dispatch = useAppDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [notes, setNotes] = useState(myBook.notes);
	const [status, setStatus] = useState<ReadingStatus>(myBook.status);
	const [showConfirm, setShowConfirm] = useState(false);
	const [isRemoving, setIsRemoving] = useState(false);

	const handleUpdate = () => {
		dispatch(updateMyBookStatus({ myBookId: myBook.id, status, notes }));
		setIsEditing(false);
	};

	const handleRemove = () => {
		const loadingId = toast.loading("Removing book...");
		setIsRemoving(true);
		try {
			dispatch(removeFromShelf(myBook.id)).unwrap();
			toast.dismiss(loadingId);
			toast.success("Book removed successfully!");
			setShowConfirm(false);
		} catch (error) {
			toast.dismiss(loadingId);
			toast.error("Failed to remove book");
		} finally {
			setIsRemoving(false);
		}
	};

	const getStatusBadge = (status: ReadingStatus) => {
		switch (status) {
			case "UNREAD":
				return (
					<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 uppercase tracking-wider">
						<Bookmark className="w-3 h-3" /> Unread
					</span>
				);
			case "READING":
				return (
					<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse uppercase tracking-wider">
						<BookOpen className="w-3 h-3" /> Reading
					</span>
				);
			case "COMPLETED":
				return (
					<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800 uppercase tracking-wider">
						<CheckCircle className="w-3 h-3" /> Completed
					</span>
				);
		}
	};

	return (
		<div className="relative p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md group">
			{showConfirm ? (
				<ConfirmModal
					isOpen={showConfirm}
					onClose={() => setShowConfirm(false)}
					onConfirm={handleRemove}
					title={"Delete book?"}
					message={"Are you sure? This action cannot be undone"}
					isLoading={isRemoving}
				/>
			) : (
				<button
					onClick={() => setShowConfirm(true)}
					title="Remove from Shelf"
					className="absolute p-2 text-red-500 transition-colors bg-white border border-red-500 rounded-full opacity-0 cursor-pointer -top-3 -right-4 hover:bg-red-500 hover:text-white group-hover:opacity-100"
				>
					<Trash className="w-4 h-4" />
				</button>
			)}

			<div className="flex items-start gap-5">
				<div className="relative shrink">
					{myBook.book.imageUrl ? (
						<img
							src={myBook.book.imageUrl}
							className="object-cover w-auto h-64 transition-shadow shadow-sm rounded-xl group-hover:shadow-md"
							alt={myBook.book.title}
						/>
					) : (
						<div className="flex items-center justify-center w-24 p-2 text-xs text-center text-gray-400 bg-gray-100 h-36 rounded-xl">
							No Cover
						</div>
					)}
				</div>

				<div className="flex-1 min-w-0 space-y-3">
					<span className="text-[10px] font-mono text-gray-400">ISBN: {myBook.book.isbn}</span>

					<div className="flex items-start justify-between mb-1">
						<h3 className="text-lg font-bold text-gray-900 transition-colors line-clamp-3 group-hover:text-blue-600">
							{myBook.book.title}
						</h3>
					</div>
					<p className="text-sm text-gray-500">{getPrimaryAuthorName(myBook.book.authors)}</p>
					<div className="">{getStatusBadge(myBook.status)}</div>
					<div className="">
						<p className="text-sm font-semibold text-gray-900">My Notes</p>
						<p className="text-sm italic">{notes || "No notes yet"}</p>
					</div>
				</div>
			</div>

			{isEditing ? (
				<div className="p-4 mt-4 space-y-4 border border-gray-100 bg-gray-50 rounded-2xl">
					{/* Status */}
					<div className="">
						<p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">
							Update Status
						</p>

						<select
							className="w-full px-3 py-2 text-sm transition-all bg-white border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
							value={status}
							onChange={(e) => setStatus(e.target.value as ReadingStatus)}
						>
							<option value="UNREAD">Unread</option>
							<option value="READING">Reading</option>
							<option value="COMPLETED">Completed</option>
						</select>
					</div>

					{/* Notes */}
					<div className="">
						<p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">
							Edit Notes
						</p>

						<textarea
							className="w-full p-3 text-sm transition-all bg-white border border-gray-200 outline-none resize-none rounded-xl focus:ring-2 focus-within:ring-blue-500"
							value={notes || ""}
							onChange={(e) => setNotes(e.target.value)}
							rows={2}
							placeholder="Add your thoughts..."
						/>
					</div>

					{/* Actions */}
					<div className="flex gap-2 pt-2">
						<Button
							onClick={handleUpdate}
							className="flex-1 font-bold transition-all shadow-sm  active:scale-95"
						>
							Save
						</Button>
						<Button
							onClick={() => setIsEditing(false)}
							variant="secondary"
							className="font-bold transition-alls active:scale-95"
						>
							Cancel
						</Button>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-end mt-3">
					<button
						onClick={() => {
							setNotes(myBook.notes);
							setStatus(myBook.status);
							setIsEditing(true);
						}}
						className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1.5 transition-colors group/btn cursor-pointer"
					>
						<Edit className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
						<span>Edit</span>
					</button>
				</div>
			)}
		</div>
	);
}
