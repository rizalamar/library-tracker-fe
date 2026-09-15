import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import MyShelf from "./pages/MyShelf";
import AdminRoute from "./components/layout/AdminRoute";
import AdminPanel from "./pages/AdminPanel";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getMyProfile } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
	const dispatch = useAppDispatch();
	const token = localStorage.getItem("token");
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (token && !user) {
			dispatch(getMyProfile());
		}
	}, [dispatch, token, user]);

	return (
		<Router>
			<Toaster position="top-right" richColors />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route element={<ProtectedRoute />}>
					<Route element={<Layout />}>
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/my-shelf" element={<MyShelf />} />

						<Route element={<AdminRoute />}>
							<Route path="/admin" element={<AdminPanel />} />
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
