import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
}

export default function Button({
	children,
	variant = "primary",
	size = "md",
	isLoading,
	className = "",
	...props
}: ButtonProps) {
	const variants = {
		primary: "bg-blue-600 text-white hover:bg-blue-700",
		secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
		danger: "bg-red-600 text-white hover:bg-red-700",
	};

	const sizes = {
		sm: "px-3 py-1 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	return (
		<button
			className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition flex items-center justify-center disabled:opacity-50 ${className} cursor-pointer`}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : children}
		</button>
	);
}
