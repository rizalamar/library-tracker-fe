import Button from "./Button";

interface PaginationProps {
	page: number;
	setPage: (page: number) => void;
	hasMore: boolean;
}

export default function Pagination({ page, setPage, hasMore }: PaginationProps) {
	return (
		<div className="mt-8 flex justify-center items-center gap-4">
			<Button
				onClick={() => setPage(page - 1)}
				disabled={page === 0}
				variant="secondary"
				size="md"
				className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed"
			>
				Prev
			</Button>

			<span className=" px-4 py-2 font-bold">{page + 1}</span>

			<Button
				disabled={!hasMore}
				onClick={() => setPage(page + 1)}
				className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Next
			</Button>
		</div>
	);
}
