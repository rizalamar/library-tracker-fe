import { X } from "lucide-react";
import type { BookResponse } from "../../../../types/book";
import Button from "../../../ui/Button";
import BookDetailHeader from "./BookDetailHeader";
import BookDetailMetaData from "./BookDetailMetaData";
import BookDetailDescription from "./BookDetailDescription";
import BookDetailTags from "./BookDetailTags";

interface ModalProps {
	book: BookResponse;
	onClose: () => void;
}

export default function BookDetailModal({ book, onClose }: ModalProps) {
	console.log("🚀 ~ BookDetailModal ~ book:", book.description);

	if (!book) return null;

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

				<BookDetailHeader book={book} />

				<BookDetailMetaData book={book} />

				<div className="pr-2 mt-4 mb-4 space-y-3 overflow-y-auto max-h-60">
					<BookDetailDescription description={book.description} />

					{/* Subjects */}
					<BookDetailTags
						label={"Subjects"}
						tags={book.subjects}
						bgColorClass="bg-blue-50 text-blue-700 border-blue-100"
					/>

					{/* Languages */}
					<BookDetailTags
						label={"Languages"}
						tags={book.languages}
						bgColorClass="bg-purple-50 text-purple-700 border-purple-100"
					/>

					{/* Publish Places */}
					<BookDetailTags
						label={"Publish Places"}
						tags={book.publishPlaces}
						bgColorClass="bg-orange-50 text-orange-700 border-orange-100"
					/>

					{/* Subject People */}
					<BookDetailTags
						label={"Subject People"}
						tags={book.subjectsPeople}
						bgColorClass="bg-green-50 text-green-700 border-green-100"
					/>

					{/* Subject Times */}
					<BookDetailTags
						label={"Subject Times"}
						tags={book.subjectTimes}
						bgColorClass="bg-red-50 text-red-700 border-red-100"
					/>
				</div>

				{/* 
				<div className="flex items-start gap-6">
					<img
						src={book.imageUrl ?? "undefined"}
						alt={book.title}
						className="object-cover w-32 h-48 mb-4 rounded-lg"
					/>

					<div className="flex-1">
						<h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900">{book.title}</h2>

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
						<p className="text-sm font-medium">{book.publishers?.map((p) => p).join(", ") || "N/A"}</p>
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

					{book.description && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">Description</span>
							<p className="text-sm text-gray-600 mt-1">{book.description}</p>
						</div>
					)}

					{book.physicalFormat && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">Format</span>
							<p className="text-sm text-gray-600 mt-1">{book.physicalFormat}</p>
						</div>
					)}

					{book.languages && book.languages.length > 0 && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">Languages</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{book.languages.map((lang) => (
									<span
										key={lang}
										className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-[10px] font-medium border border-purple-100"
									>
										{lang}
									</span>
								))}
							</div>
						</div>
					)}

					{book.publishPlaces && book.publishPlaces.length > 0 && (
						<div>
							<span className="text-xs font-bold text-gray-400 uppercase">Publish Places</span>
							<div className="flex flex-wrap gap-1 mt-1">
								{book.publishPlaces.map((place) => (
									<span
										key={place}
										className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-[10px] font-medium border border-orange-100"
									>
										{place}
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
				</div>
*/}
				<Button onClick={onClose} className="w-full font-bold transition-all shadow-lg shadow-blue-200">
					Close Details
				</Button>
			</div>
		</div>
	);
}
