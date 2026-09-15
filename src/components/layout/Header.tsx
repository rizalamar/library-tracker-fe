import { Bell, Search, User } from "lucide-react";

export default function Header() {
	return (
		<header className="flex h-16 items-center justify-between px-8 bg-white border-b border-gray-100">
			{/* Search Bar */}
			<div className="relative w-96">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
				<input
					type="text"
					placeholder="Search bookk by title..."
					className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
				/>
			</div>

			{/* Right side */}
			<div className="flex items-center gap-6">
				<button className="relative text-gray-500 hover:text-gray-700">
					<Bell className="w-5 h-5" />
					<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
				</button>

				<div className="flex items-center gap-2 cursor-pointer">
					<div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
						<User className="w-full h-full p-1.5 text-gray-500" />
					</div>
					<span className="text-sm font-medium text-gray-700">User Name</span>
				</div>
			</div>
		</header>
	);
}
