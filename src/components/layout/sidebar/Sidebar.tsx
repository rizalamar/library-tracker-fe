import { NavLink, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect } from "react";
import { fetchGenres } from "../../../features/books/genreSlice";
import SidebarHeader from "./SidebarHeader";
import SidebarMainNav from "./SidebarMainNav";
import SidebarGenreList from "./SidebarGenreList";
import { fetchPopularAuthors } from "../../../features/externalBooks/externalBookSlice";

interface SidebarProps {
	isAdmin: boolean;
}

export default function Sidebar({ isAdmin }: SidebarProps) {
	const dispatch = useAppDispatch();
	const { items: genres } = useAppSelector((state) => state.genres);
	const { popularAuthors } = useAppSelector((state) => state.externalBooks);
	const [searchParams] = useSearchParams();
	const activeGenre = searchParams.get("genre");

	useEffect(() => {
		dispatch(fetchGenres());
		dispatch(fetchPopularAuthors(5));
	}, [dispatch]);

	return (
		<aside className="w-64 bg-white border-r border-gray-100 p-8 flex flex-col h-screen sticky top-0 overflow-y-auto">
			<SidebarHeader />

			{/* Navigations */}

			<nav className="flex flex-col gap-8">
				<SidebarMainNav isAdmin={isAdmin} />

				<SidebarGenreList genres={genres} activeGenre={activeGenre} />

				<div className="mt-10">
					<h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Authors</h2>

					<div className="flex flex-col gap-2">
						{popularAuthors.map((author) => (
							<NavLink
								to={`/authors/${encodeURIComponent(author.name)}`}
								className={({ isActive }) =>
									`text-sm block truncate ${
										isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-500"
									}`
								}
							>
								{author.name}
							</NavLink>
						))}
					</div>
				</div>
			</nav>
		</aside>
	);
}
