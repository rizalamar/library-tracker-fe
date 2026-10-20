import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect } from "react";
import { fetchGenres } from "../../../features/books/genreSlice";
import SidebarHeader from "./SidebarHeader";
import SidebarMainNav from "./SidebarMainNav";
import SidebarGenreList from "./SidebarGenreList";
import { fetchPopularAuthors } from "../../../features/externalBooks/externalBookSlice";
import SidebarAuthors from "./SidebarAuthors";

interface SidebarProps {
	isAdmin: boolean;
}

export default function Sidebar({ isAdmin }: SidebarProps) {
	const dispatch = useAppDispatch();
	const { items: genres, loading: genresLoading } = useAppSelector((state) => state.genres);
	const { popularAuthors, loading: authorsLoading } = useAppSelector((state) => state.externalBooks);
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

				<SidebarGenreList genres={genres} activeGenre={activeGenre} loading={genresLoading} />

				<SidebarAuthors authors={popularAuthors} loading={authorsLoading} />
			</nav>
		</aside>
	);
}
