import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export default function AuthorDetail() {
	const { name } = useParams();
	const { popularAuthors } = useAppSelector((state) => state.externalBooks);

	const author = popularAuthors.find((author) => author.name === name);
	if (!author) return <Navigate to="/dashboard" replace />;

	return (
		<div className="p-8 max-w-6xl mx-auto">
			{/* Hero */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
				<div className="flex flex-col justify-center">
					<h1 className="text-5xl font-black font-serif text-gray-900 mb-6">{author.name}</h1>
					<p className="text-lg text-gray-600 leading-relaxed mb-6">
						{author.bio || "No biography available."}
					</p>

					<div className="flex gap-4">
						{author.links.map((link, i) => (
							<a
								key={i}
								href={link.url}
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 font-bold hover:underline"
							>
								{link.title}
							</a>
						))}
					</div>
				</div>

				<div className="bg-gray-200 rounded-3xl overflow-hidden aspect-square">
					{author.photos[0] ? (
						<img src={author.photos[0]} alt={author.name} className="w-full h-full object-cover" />
					) : (
						<div className="flex items-center justify-center h-full text-gray-400">No Photo</div>
					)}
				</div>
			</div>

			{/* Works */}
			<h2 className="text-2xl font-bold mb-8">Top Works by {author.name}</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{author.topWorks.map((work) => (
					<div key={work.key} className="bg-white p-4 rounded-xl shadow-sm border">
						<img
							src={work.coverUrl}
							alt={work.title}
							className="w-full h-48 object-cover rounded-md mb-3"
						/>
						<h3 className="font-bold text-sm truncate">{work.title}</h3>
						<p className="text-xs text-gray-500">{work.firstPublishYear}</p>
					</div>
				))}
			</div>
		</div>
	);
}
