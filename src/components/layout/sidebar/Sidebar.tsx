import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect } from "react";
import { fetchGenres } from "../../../features/books/genreSlice";
import SidebarHeader from "./SidebarHeader";
import SidebarMainNav from "./SidebarMainNav";
import SidebarGenreList from "./SidebarGenreList";

interface SidebarProps {
	isAdmin: boolean;
}

export default function Sidebar({ isAdmin }: SidebarProps) {
	const dispatch = useAppDispatch();
	const { items: genres } = useAppSelector((state) => state.genres);
	const [searchParams] = useSearchParams();
	const activeGenre = searchParams.get("genre");

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	console.log("🚀 ~ Sidebar ~ genres:", genres);

	return (
		<aside className="w-64 bg-white border-r border-gray-100 p-8 flex flex-col h-screen sticky top-0 overflow-y-auto">
			<SidebarHeader />

			{/* Navigations */}

			<nav className="flex flex-col gap-8">
				<SidebarMainNav isAdmin={isAdmin} />

				<SidebarGenreList genres={genres} activeGenre={activeGenre} />

				<div className="mt-10">
					<h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Authors</h2>

					<p className="text-sm text-gray-500">Coming soon...</p>
				</div>
			</nav>
		</aside>
	);
}
