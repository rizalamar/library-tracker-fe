import { useState } from "react";
import type { User } from "../../../types/auth";

interface ProfileProps {
	user: User | null;
	onSave: (fullName: string, email: string) => void;
	onDelete: () => void;
}

export default function UserProfile({ user, onSave, onDelete }: ProfileProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [fullName, setFullName] = useState(user?.fullName || "");
	const [email, setEmail] = useState(user?.email || "");

	const handleSave = (fullName: string, email: string) => {
		onSave(fullName, email);
		setIsEditing(false);
	};

	return (
		<div className="mx-auto mb-8 space-y-6 max-w-7xl">
			<div className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
				<div className="flex items-start justify-between mb-6">
					<div className="flex items-center gap-6">
						<div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-200">
							{user?.username.charAt(0).toUpperCase()}
						</div>

						<div>
							{isEditing ? (
								<input
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									className="w-full text-2xl font-bold border-b border-blue-500 outline-none"
								/>
							) : (
								<h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
							)}
							<p className="text-gray-500">@{user?.username}</p>
							<span className="mt-2 inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
								{user?.role}
							</span>
						</div>
					</div>
				</div>

				{!isEditing ? (
					<button
						onClick={() => setIsEditing(true)}
						className="text-sm font-bold text-blue-600 cursor-pointer hover:underline"
					>
						Edit Profile
					</button>
				) : (
					<button
						onClick={() => handleSave(fullName, email)}
						className="text-sm font-bold text-green-600 cursor-pointer hover:underline"
					>
						Save Changes
					</button>
				)}
			</div>

			<div className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
				<h3 className="mb-6 text-lg font-bold text-gray-900">Account Information</h3>

				<div className="grid grid-cols-1 gap-6 pt-6 border-t border-gray-100 md:grid-cols-2">
					<div>
						<p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Email Address</p>
						{isEditing ? (
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full mt-1 text-sm font-medium text-gray-700 border-b border-blue-500 outline-none"
							/>
						) : (
							<p className="mt-1 text-sm font-medium text-gray-700">{user?.email}</p>
						)}
					</div>
					<div>
						<p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Join Since</p>
						<p className="mt-1 text-sm font-medium text-gray-700">August 2026</p>
					</div>
				</div>

				{user?.role !== "ADMIN" && (
					<div className="pt-6 mt-8 border-t border-gray-100">
						<button onClick={onDelete} className="text-sm font-bold text-red-600 hover:text-red-700">
							Delete My Account
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
