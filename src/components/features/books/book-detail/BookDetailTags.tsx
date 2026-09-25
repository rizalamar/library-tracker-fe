interface BookDetailTagsProps {
	label: string;
	tags: string[];
	bgColorClass?: string;
}

export default function BookDetailTags({ label, tags, bgColorClass = "bg-gray50 textgray-700" }: BookDetailTagsProps) {
	return (
		<div>
			<span className="text-xs font-bold text-gray-400 uppercase">{label}</span>
			<div className="flex flex-wrap gap-1 mt-1">
				{tags.map((tag: string) => (
					<span key={tag} className={` ${bgColorClass} px-2 py-0.5 rounded text-[10px] font-medium border`}>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}
