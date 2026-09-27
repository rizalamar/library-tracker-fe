import { BookOpen, Home, UserRoundCog } from "lucide-react";
import NavLinkItem from "../NavLinkItem";

interface SidebarMainNavProps {
	isAdmin: boolean;
}

export default function SidebarMainNav({ isAdmin }: SidebarMainNavProps) {
	return (
		<div className="flex flex-col gap-3">
			<NavLinkItem to={"/dashboard"} icon={Home} label={"Dashboard"} />
			<NavLinkItem to={"/my-shelf"} icon={BookOpen} label={"My Shelf"} />
			{isAdmin && <NavLinkItem to={"/admin"} icon={UserRoundCog} label={"Admin Panel"} />}
		</div>
	);
}
