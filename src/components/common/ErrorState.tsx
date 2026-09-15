import { AlertCircle } from "lucide-react";
import Button from "../ui/Button";

interface ErrorStateProps {
	message: string;
	onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-20 text-center">
			<div className="p-4 m-4 rounded-full bg-red-50">
				<AlertCircle className="w-8 h-8 text-red-600" />
			</div>
			<h3 className="mb-2 text-lg font-bold text-gray-900">Something went wrong</h3>
			<p className="max-w-sm mb-6 text-sm text-gray-500">{message}</p>
			{onRetry && (
				<Button
					onClick={onRetry}
					variant="primary"
					size="lg"
					className="font-bold transition-all active:scale-95"
				>
					Retry Connection
				</Button>
			)}
		</div>
	);
}
