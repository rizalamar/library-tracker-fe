import { Outlet } from "react-router-dom";
import type { RootState } from "../../store/store";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../../hooks/redux";

export default function Layout() {
	const { user } = useAppSelector((state: RootState) => state.auth);
	const isAdmin = user?.role === "ADMIN";

	return (
		<div className="flex min-h-screen bg-gray-50 overflow-hidden">
			{/* Sidebar */}
			<Sidebar isAdmin={isAdmin} />

			<div className="flex-1 flex flex-col h-screen overflow-hidden">
				<Header />

				<main className="flex-1 transition-all duration-300 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
