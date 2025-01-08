import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import Container from '../components/Container';
import CredentialsForm from '../components/CredentialsForm';

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = { email, password };

		await signUp(newUser);
	};

	return (
		<Container classNames="flex">
			<section className="flex flex-col self-center mx-auto w-full max-w-lg p-6">
				<h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
				<CredentialsForm
					title="Sign Up"
					email={email}
					onEmailChange={handleEmailChange}
					password={password}
					onPasswordChange={handlePasswordChange}
					onSubmit={handleSubmit}
					buttonLabel="Sign Up"
					isEmailValid={validEmail}
					isPasswordValid={validPassword}
					showError={true}
				/>
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
			</section>
		</Container>
	);
};

export default SignUpPage;
