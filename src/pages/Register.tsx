import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { clearError, registerUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Button from "../components/ui/Button";

interface RegisterFormValue {
	username: string;
	fullName: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export default function Register() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { loading, error, token, user } = useAppSelector((state) => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValue>({
		defaultValues: {
			username: "",
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	useEffect(() => {
		if (token && user) {
			navigate("/dashboard");
		}
	}, [token, user, navigate]);

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const onSubmit = async (data: RegisterFormValue) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...userData } = data;
		const result = await dispatch(registerUser(userData));

		if (registerUser.fulfilled.match(result)) {
			console.log("Registration successfull!");
		} else if (registerUser.rejected.match(result)) {
			console.error("Registration failed", result.payload);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Create a New Account</h2>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* FullName */}
					<div className="">
						<label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
							Full Name
						</label>
						<input
							type="text"
							id="fullName"
							{...register("fullName", {
								required: "Full name is required",
								minLength: {
									value: 3,
									message: "Full name must be at least 3 characters long",
								},
							})}
							className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
								errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-300"
							} `}
							placeholder="Enter your full name"
						/>
						{errors.fullName && (
							<p className="mt-1 text-xs text-red-500">{String(errors.fullName.message)}</p>
						)}
					</div>

					{/* Username */}
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
							className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
								errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300"
							} `}
							placeholder="Enter your username"
						/>
						{errors.username && (
							<p className="mt-1 text-xs text-red-500">{String(errors.username.message)}</p>
						)}
					</div>

					{/* Email */}
					<div className="">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							id="email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "Enter a valid email address",
								},
							})}
							className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
								errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
							} `}
							placeholder="Enter your email"
						/>
						{errors.email && <p className="mt-1 text-xs text-red-500">{String(errors.email.message)}</p>}
					</div>

					{/* Password */}
					<div className="">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters long",
								},
							})}
							className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
								errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300"
							} `}
							placeholder="Enter your password"
						/>
						{errors.password && (
							<p className="mt-1 text-xs text-red-500">{String(errors.password.message)}</p>
						)}
					</div>

					{/* Confirm Password */}
					<div className="">
						<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							{...register("confirmPassword", {
								required: "Confirm Password is required",
								validate: (value, formValues) => {
									return value === formValues.password || "Password do not match";
								},
							})}
							className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
								errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300"
							} `}
							placeholder="Confirm your password"
						/>
						{errors.confirmPassword && (
							<p className="mt-1 text-xs text-red-500">{String(errors.confirmPassword.message)}</p>
						)}
					</div>

					{error && <div className="text-sm text-center text-red-500">{error}</div>}

					<Button type="submit" variant="primary" isLoading={loading} className="w-full">
						Sign Up
					</Button>
				</form>

				<div className="mt-6 text-sm text-center text-gray-600">
					Already have an account?{" "}
					<a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
						Login
					</a>
				</div>
			</div>
		</div>
	);
}
