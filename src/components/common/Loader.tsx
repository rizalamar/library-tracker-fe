import { Loader2 } from "lucide-react";

interface LoaderProps {
	message: string;
}

export default function Loader({ message = "Loading..." }: LoaderProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-3 py-20">
			<Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
			<p className="text-sm font-medium text-gray-500">{message}</p>
		</div>
	);
}
