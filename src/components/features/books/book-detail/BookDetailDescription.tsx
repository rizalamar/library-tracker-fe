interface BookDetailDescriptionProps {
	description: string | null;
}

export default function BookDetailDescription({ description }: BookDetailDescriptionProps) {
	if (!description) return null;

	return (
		<div>
			<span className="text-xs font-bold text-gray-400 uppercase">Description</span>
			<p className="text-sm text-gray-600 mt-1">{description}</p>
		</div>
	);
}
