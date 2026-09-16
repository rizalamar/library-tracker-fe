import { BookOpen, Home, UserRoundCog } from "lucide-react";
import NavLinkItem from "./NavLinkItem";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { fetchGenres } from "../../features/books/genreSlice";

interface SidebarProps {
	isAdmin: boolean;
}

export default function Sidebar({ isAdmin }: SidebarProps) {
	const dispatch = useAppDispatch();
	const { items: genres } = useAppSelector((state) => state.genres);

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	console.log("🚀 ~ Sidebar ~ genres:", genres);

	return (
		<aside className="w-64 bg-white border-r border-gray-100 p-8 flex flex-col h-screen sticky top-0 overflow-y-auto">
			<h1 className="text-2xl font-black tracking-tight text-blue-600 mb-10">HOMELIBRARY</h1>

			{/* Navigations */}

			<nav className="flex flex-col gap-8">
				<div className="flex flex-col gap-3">
					<NavLinkItem to={"/dashboard"} icon={Home} label={"Dashboard"} />
					<NavLinkItem to={"/my-shelf"} icon={BookOpen} label={"My Shelf"} />
					{isAdmin && <NavLinkItem to={"/admin"} icon={UserRoundCog} label={"Admin Panel"} />}
				</div>

				<div>
					<h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Genres</h2>
					<div className="flex flex-col gap-3">
						{genres.map((genre) => (
							<NavLink
								key={genre.name}
								to={`/dashboard?genre=/${genre.name}`}
								className={({ isActive }) =>
									`text-sm font-medium ${
										isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
									}`
								}
							>
								{genre.name} <span className="text-gray-400">({genre.count})</span>
							</NavLink>
						))}
					</div>
				</div>

				{/* Nanti kita isi AuthorList di sini */}
				<div className="mt-10">
					<h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Authors</h2>
					{/* Mockup dulu */}
					<p className="text-sm text-gray-500">Coming soon...</p>
				</div>
			</nav>
		</aside>
	);
}
