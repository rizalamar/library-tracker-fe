import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

export default function AdminRoute() {
	const { user } = useAppSelector((state) => state.auth);

	if (!user || user.role !== "ADMIN") {
		return <Navigate to={"/dashboard"} replace />;
	}

	return <Outlet />;
}
