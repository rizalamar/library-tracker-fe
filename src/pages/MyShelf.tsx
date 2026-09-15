import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchMyBooks } from "../features/myBooks/myBookSlice";
import ShelfBookCard from "../components/features/myBooks/ShelfBookCard";
import UserProfile from "../components/features/myBooks/UserProfile";
import { deleteAccount, updateProfile } from "../features/auth/authSlice";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import ConfirmModal from "../components/common/ConfirmModal";
import { toast } from "sonner";

export default function MyShelf() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const { items, loading, error } = useAppSelector((state) => state.myBooks);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	useEffect(() => {
		dispatch(fetchMyBooks());
	}, [dispatch]);

	const handleSave = (fullName: string, email: string) => {
		dispatch(updateProfile({ fullName, email }));
	};

	const handleRetry = () => {
		dispatch(fetchMyBooks());
	};

	return (
		<div className="flex flex-col min-h-screen px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="grow">
				<UserProfile user={user} onSave={handleSave} onDelete={() => setShowDeleteConfirm(true)} />

				<h1 className="mb-6 text-2xl font-bold text-gray-900">My Personal Shelf</h1>

				{loading ? (
					<Loader message={"Loading your shelf..."} />
				) : error ? (
					<ErrorState message={error} onRetry={handleRetry} />
				) : items.length === 0 ? (
					<div className="py-20 text-center border-2 border-gray-200 border-dashed rounded-2xl">
						<p className="text-gray-500">Your shelf is empty. Go back to Dashboard to add some books!</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{items.map((myBook) => (
							<ShelfBookCard key={myBook.id} myBook={myBook} />
						))}
					</div>
				)}
			</div>

			<ConfirmModal
				isOpen={showDeleteConfirm}
				onClose={() => setShowDeleteConfirm(false)}
				onConfirm={() => {
					dispatch(deleteAccount());
					toast.success("Account deleted");
				}}
				title={"Delete Account"}
				message={"This action is irreversible. All your data will be wiped"}
			/>
		</div>
	);
}
