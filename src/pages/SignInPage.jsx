import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';

const SignInPage = () => {
	const navigate = useNavigate();
	const { user, signIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, [user, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userInput = { email, password };
		await signIn({ userInput });
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<section className="min-h-screen bg-gray-900 text-gray-300 flex justify-center items-center">
			<div className="max-w-md mx-auto">
				<h1 className="text-3xl mb-8 text-center">Sign In</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex flex-col">
						<label
							htmlFor="email"
							className="mb-2 text-sm font-medium"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="px-4 py-2 rounded-md border border-gray-300 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="password"
							className="mb-2 text-sm font-medium"
						>
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="px-4 py-2 rounded-md border border-gray-300 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
								required
							/>
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="absolute inset-y-0 right-2 px-2 text-gray-400 hover:text-gray-200"
							>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
					</div>
					<button
						type="submit"
						className="w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-gray-200"
					>
						Sign In
					</button>
				</form>
				<p className="mt-6 text-center">
					Don't have an account?
					<br />
					<span className="inline-block text-blue-400 hover:underline">
						<Link to="/signup">Sign Up</Link>
					</span>
				</p>
			</div>
		</section>
	);
};

export default SignInPage;
