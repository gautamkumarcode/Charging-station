"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
	clearError,
	signIn,
	signInWithGoogle,
} from "../../store/slices/authSlice";

export function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { loading, error } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(signIn({ email, password }));
	};

	const handleGoogleSignIn = () => {
		dispatch(signInWithGoogle());
	};

	const handleClearError = () => {
		dispatch(clearError());
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-indigo-200 px-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>
					<p className="text-gray-600 mt-2 text-sm">
						Login to your charging station dashboard
					</p>
				</div>

				{/* Error */}
				{error && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className="bg-red-100 border border-red-300 text-red-700 text-sm rounded-md px-4 py-2 relative">
						{error}
						<button
							className="absolute top-1 right-2 text-xs text-red-600 hover:text-red-800"
							onClick={handleClearError}>
							Dismiss
						</button>
					</motion.div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="example@mail.com"
							className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="••••••••"
							className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50">
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				{/* Divider */}
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<div className="flex-grow border-t border-gray-200" />
					or
					<div className="flex-grow border-t border-gray-200" />
				</div>

				{/* Google Sign-in */}
				<button
					onClick={handleGoogleSignIn}
					disabled={loading}
					className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 bg-white rounded-md hover:bg-gray-50 transition duration-200 disabled:opacity-50">
					<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
						<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
						<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
						<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
						<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
					</svg>
					<span>Continue with Google</span>
				</button>
			</motion.div>
		</div>
	);
}
