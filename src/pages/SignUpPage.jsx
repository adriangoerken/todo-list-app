import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import Container from '../components/Container';

const SignUpPage = () => {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,128}$/;
	const navigate = useNavigate();
	const { user, signUp } = useAuth();
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, [user, navigate]);

	useEffect(() => {
		setValidEmail(emailRegex.test(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(passwordRegex.test(password));
	}, [password]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = { email, password };
		await signUp(newUser);
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Container>
			<section className="min-h-screen bg-gray-900 text-gray-300 flex justify-center items-center">
				<div className="max-w-md mx-auto">
					<h1 className="text-3xl mb-8 text-center">Sign Up</h1>
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
								className={`px-4 py-2 rounded-md border ${
									email && !validEmail
										? 'border-red-500'
										: 'border-gray-300'
								} bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
								required
							/>
							{email && !validEmail && (
								<span className="text-sm text-red-500 mt-1">
									Please enter a valid email.
								</span>
							)}
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
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className={`px-4 py-2 rounded-md border ${
										password && !validPassword
											? 'border-red-500'
											: 'border-gray-300'
									} bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full`}
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
							{password && !validPassword && (
								<span className="text-sm text-red-500 mt-1">
									Password must be at least 12 characters long
									and include at least one uppercase letter,
									one number, and one special character:
									@$!%*?&.
								</span>
							)}
						</div>
						<button
							type="submit"
							disabled={!validEmail || !validPassword}
							className={`w-full px-4 py-2 rounded-md ${
								!validEmail || !validPassword
									? 'bg-gray-600 cursor-not-allowed'
									: 'bg-blue-500 hover:bg-blue-600'
							} text-gray-200`}
						>
							Sign Up
						</button>
					</form>
					<p className="mt-6 text-center">
						Already have an account?
						<br />
						<span className="inline-block text-blue-400 hover:underline">
							<Link to="/signin">Sign In</Link>
						</span>
					</p>
				</div>
			</section>
		</Container>
	);
};

export default SignUpPage;
