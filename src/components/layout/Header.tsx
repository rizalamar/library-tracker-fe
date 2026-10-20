import { ChevronDown, LogOut, Search, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../features/auth/authSlice";

export default function Header() {
	const [query, setQuery] = useState("");
	const [showDropDown, setShowDropDown] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate(`/dashboard?search=${encodeURIComponent(query)}`);
	};

	const handleLogout = () => {
		dispatch(logout());
		setShowDropDown(false);
	};

	return (
		<header className="flex h-16 items-center justify-between px-8 bg-white border-b border-gray-100">
			{/* Search Bar */}
			<form className="relative w-96" onSubmit={handleSearch}>
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
				<input
					type="text"
					placeholder="Search bookk by title..."
					className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</form>

			{/* Right side */}
			<div className="flex items-center gap-6">
				<div className="relative">
					<div
						className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-lg transition-colors"
						onClick={() => setShowDropDown(!showDropDown)}
					>
						<div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
							<User className="w-full h-full p-1.5 text-gray-500" />
						</div>

						<span className="text-sm font-medium text-gray-700">{user?.username}</span>
						<ChevronDown
							className={`w-4 h-4 text-gray-400 transition-transform ${showDropDown ? "rotate-180" : ""}`}
						/>
					</div>

					{/* Menu */}
					{showDropDown && (
						<div className="absolute right-0 top-12 w-30 bg-white border border-gray-100 rounded-lg py-2 z-50">
							<button
								onClick={handleLogout}
								className="flex items-center gap-2
							 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
							>
								<LogOut className="w-4 h-4" /> Sign Out
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
