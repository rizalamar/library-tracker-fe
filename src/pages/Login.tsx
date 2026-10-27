import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearError, loginUser } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Button from "../components/ui/Button";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormValues {
	username: string;
	password: string;
}

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { loading, error, token, user } = useAppSelector((state) => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	// login berhasil
	useEffect(() => {
		if (token && user) {
			navigate("/dashboard");
		}
	}, [token, user, navigate]);

	const onSubmit = async (data: LoginFormValues) => {
		dispatch(clearError());
		await dispatch(
			loginUser({
				username: data.username,
				password: data.password,
			})
		);
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Login to your account</h2>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="">
						<label htmlFor="username" className="block text-sm font-medium text-gray-700">
							Username
						</label>
						<input
							type="text"
							id="username"
							{...register("username", {
								required: "Username is required",
								minLength: {
									value: 3,
									message: "Username must be at least 3 characters long",
								},
							})}
							className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
								errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300"
							}`}
							placeholder="Enter your username"
						/>
						{errors.username && (
							<p className="mt-1 text-xs text-red-500">{String(errors.username.message)}</p>
						)}
					</div>

					<div className="relative">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters long",
								},
							})}
							className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
								errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300"
							}`}
							placeholder="Enter your password"
						/>
						<span
							className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 cursor-pointer z-10"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
						</span>
						{errors.password && (
							<p className="mt-1 text-xs text-red-500">{String(errors.password.message)}</p>
						)}
					</div>

					{error && <p className="text-sm text-center text-red-500">{error}</p>}

					<Button type="submit" variant="primary" isLoading={loading} className="w-full">
						Sign In
					</Button>
				</form>

				<div className="mt-6 text-sm text-center text-gray-600">
					Don't have an account?{" "}
					<a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
}
