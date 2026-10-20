import { NavLink } from "react-router-dom";
import type { AuthorDetail } from "../../../types/book";
import Loader from "../../common/Loader";

interface SidebarAuthorsProps {
	authors: AuthorDetail[];
	loading: boolean;
}

export default function SidebarAuthors({ authors, loading }: SidebarAuthorsProps) {
	return (
		<div className="mt-10">
			<h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Authors</h2>

			{loading ? (
				<Loader message={"Loading authors..."} />
			) : (
				<div className="flex flex-col gap-1">
					{authors.map((author, index) => (
						<NavLink
							key={index}
							to={`/authors/${encodeURIComponent(author.name)}`}
							className={({ isActive }) =>
								`text-sm font-medium block truncate px-4 py-2 ${
									isActive
										? "text-blue-700 bg-blue-50 border-l-2 border-blue-600"
										: "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-2 border-transparent"
								}`
							}
						>
							{author.name}
						</NavLink>
					))}
				</div>
			)}
		</div>
	);
}
