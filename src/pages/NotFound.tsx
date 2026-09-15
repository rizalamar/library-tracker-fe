import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
			<h1 className="text-6xl font-bold text-gray-800">404</h1>
			<h2 className="text-2xl font-semibold text-gray-700 mt-4">Page not found</h2>
			<p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
			<Link
				to={"/dashboard"}
				className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
			>
				Go to dashboard
			</Link>
		</div>
	);
}
