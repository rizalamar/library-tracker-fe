import Button from "../ui/Button";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	isLoading?: boolean;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isLoading }: ConfirmModalProps) {
	if (!isOpen) return null;

	return (
		<div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 duration-200 bg-white/90 backdrop-blur-sm rounded-2xl animate-in fade-in">
			<h3 className="mb-1 font-bold text-gray-900">{title}</h3>
			<p className="mb-4 text-sm text-center text-gray-600">{message}</p>
			<div className="flex gap-2">
				<Button onClick={onConfirm} disabled={isLoading} variant="danger" size="sm">
					Yes, confirm
				</Button>
				<Button onClick={onClose} disabled={isLoading} variant="secondary" size="sm">
					Cancel
				</Button>
			</div>
		</div>
	);
}
