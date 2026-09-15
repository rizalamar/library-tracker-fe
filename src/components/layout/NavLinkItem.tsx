import { type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavLinkItemProps {
	to: string;
	icon: LucideIcon;
	label: string;
}

export default function NavLinkItem({ to, icon: Icon, label }: NavLinkItemProps) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`flex items-center p-3 rounded-2xl text-sm font-bold transition-all ${
					isActive
						? "bg-blue-600 text-white shadow-lg shadow-blue-200"
						: "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
				}`
			}
		>
			<Icon className="shrink-0 w-5 h-5 mr-3" />
			{label}
		</NavLink>
	);
}
