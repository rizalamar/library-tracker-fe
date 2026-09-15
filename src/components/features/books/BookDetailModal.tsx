import { X } from "lucide-react";
import type { Book } from "../../../types/book";
import Button from "../../ui/Button";

interface ModalProps {
	book: Book;
	onClose: () => void;
}

export default function BookDetailModal({ book, onClose }: ModalProps) {
	console.log("🚀 ~ BookDetailModal ~ book:", book.authors);
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
			<div className="relative w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl">
				<Button
					onClick={onClose}
					variant="secondary"
					size="md"
					className="absolute font-bold bg-transparent top-4 right-6"
				>
					<X className="w-4 h-4" />
				</Button>

				<div className="flex items-start gap-6">
					<img
						src={book.imageUrl ?? "undefined"}
						alt={book.title}
						className="object-cover w-32 h-48 mb-4 rounded-lg"
					/>

					<div className="flex-1">
						<h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900">{book.title}</h2>
						{book.subtitle && <p className="mt-1 text-sm italic text-gray-500">{book.subtitle}</p>}
						<p className="mt-2 text-sm font-semibold text-blue-600">
							{book.authors.map((a) => a.name).join(", ")}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 p-4 mt-6 bg-gray-50 rounded-xl">
					<div className="">
						<p className="text-[10px] uppercase text-gray-400 font-bold">ISBN</p>
						<p className="text-sm font-medium">{book.isbn}</p>
					</div>
					<div className="">
						<p className="text-[10px] uppercase text-gray-400 font-bold">Publisher</p>
						<p className="text-sm font-medium">{book.publishers?.map((p) => p.name).join(", ") || "N/A"}</p>
					</div>
					<div className="">
						<p className="text-[10px] uppercase text-gray-400 font-bold">Published</p>
						<p className="text-sm font-medium">{book.publishedDate}</p>
					</div>
					<div className="">
						<p className="text-[10px] uppercase text-gray-400 font-bold">Status</p>
						<p className={`text-sm font-bold ${book.available ? "text-green-600" : "text-red-600"}`}>
							{book.available ? "Available" : "Unavailable"}
						</p>
					</div>
					<div className="">
						<p className="text-[10px] uppercase text-gray-400 font-bold">Pages</p>
						<p className={`text-sm font-medium `}>{book.number_of_pages ? book.number_of_pages : "N/A"}</p>
					</div>
				</div>

				<div className="pr-2 mt-4 mb-4 space-y-3 overflow-y-auto max-h-60">
					{book.subjects && book.subjects.length > 0 && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">Subjects</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{book.subjects.map((s) => (
									<span
										key={s}
										className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-medium border border-blue-100"
									>
										{s}
									</span>
								))}
							</div>
						</div>
					)}

					{book.subjectPlaces && book.subjectPlaces.length > 0 && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">Places</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{book.subjectPlaces.map((p) => (
									<span
										key={p}
										className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-[10px] font-medium border border-green-100"
									>
										{p}
									</span>
								))}
							</div>
						</div>
					)}

					{book.subjectTimes && book.subjectTimes.length > 0 && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">Times</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{book.subjectTimes.map((t) => (
									<span
										key={t}
										className="bg-gray-50 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium border border-gray-100"
									>
										{t}
									</span>
								))}
							</div>
						</div>
					)}

					{book.subjectsPeople && book.subjectsPeople.length > 0 && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">People</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{book.subjectsPeople.map((p) => (
									<span
										key={p}
										className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-medium border border-amber-100"
									>
										{p}
									</span>
								))}
							</div>
						</div>
					)}

					{book.excerpts && book.excerpts.length > 0 && (
						<div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
							<span className="text-xs font-bold text-gray-400 uppercase">Excerpt</span>
							<p className="mt-1 text-xs italic leading-relaxed text-gray-600">
								"{book.excerpts[0].text}"
							</p>
						</div>
					)}
				</div>

				<Button onClick={onClose} className="w-full font-bold transition-all shadow-lg shadow-blue-200">
					Close Details
				</Button>
			</div>
		</div>
	);
}
