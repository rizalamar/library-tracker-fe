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
				<div className="flex flex-col gap-2">
					{authors.map((author) => (
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
			)}
		</div>
	);
}
