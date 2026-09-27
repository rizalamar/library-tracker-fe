import { NavLink } from "react-router-dom";
import type { Genre } from "../../../types/genre";

interface SidebarGenreListProps {
	genres: Genre[];
	activeGenre: string | null;
}

export default function SidebarGenreList({ genres, activeGenre }: SidebarGenreListProps) {
	return (
		<div>
			<h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Genres</h2>
			<div className="flex flex-col gap-3">
				{genres.map((genre) => {
					const isActive = activeGenre === genre.name;

					return (
						<NavLink
							key={genre.name}
							to={`/dashboard?genre=${genre.name}`}
							className={`flex items-center justify-between px-4 py-2 transition-all duration-200 text-sm font-medium ${
								isActive
									? "text-blue-700 bg-blue-50 border-l-2 border-blue-600"
									: "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-2 border-transparent"
							}`}
						>
							<span>{genre.name}</span>
							<span
								className={`text-[10px] px-1.5 py-0.5 rounded-full ${
									isActive ? "bg-white text-blue-600" : "bg-gray-100 text-gray-500"
								}`}
							>
								({genre.count})
							</span>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}
