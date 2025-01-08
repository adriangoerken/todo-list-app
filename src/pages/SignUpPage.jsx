import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import Container from '../components/Container';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import Button from '../components/Button';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

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

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = { email, password };
		await signUp(newUser);
	};

	return (
		<Container classNames="flex">
			<div className="flex flex-col self-center mx-auto w-full max-w-lg p-6">
				<h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex flex-col">
						<label
							htmlFor="email"
							className="mb-2 text-sm font-medium"
						>
							Email
						</label>
						<TextField
							placeholder="Email"
							onchange={handleEmailChange}
							value={email}
							className={`${
								email && !validEmail
									? 'border-red-500 focus:border-red-500'
									: 'border-gray-600 focus:border-blue-700'
							}`}
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
							<PasswordField
								placeholder="Password"
								onchange={handlePasswordChange}
								value={password}
								className={`${
									password && !validPassword
										? 'border-red-500 focus:border-red-500'
										: 'border-gray-600 focus:border-blue-700'
								}`}
							/>
						</div>
						{password && !validPassword && (
							<span className="text-sm text-red-500 mt-1">
								Password must be at least 12 characters long and
								include at least one uppercase letter, one
								number, and one special character: @$!%*?&.
							</span>
						)}
					</div>
					<Button
						value="Sign Up"
						onclick={handleSubmit}
						disabled={!validEmail || !validPassword}
					/>
				</form>
				<p className="mt-6 text-center">
					Already have an account?
					<br />
					<Link
						to="/signin"
						className="text-blue-400 hover:underline"
					>
						Sign In
					</Link>
				</p>
			</div>
		</Container>
	);
};

export default SignUpPage;
