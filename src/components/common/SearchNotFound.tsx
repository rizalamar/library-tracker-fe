import { SearchX } from "lucide-react";

export default function SeachNotFound() {
	return (
		<div className="flex flex-col items-center justify-center my-auto text-center">
			<div className="p-4 m-4 rounded-full bg-red-50">
				<SearchX className="w-8 h-8 text-red-600" />
			</div>
			<h3 className="text-xl font-bold text-gray-900">No Books found</h3>
			<p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
		</div>
	);
}
