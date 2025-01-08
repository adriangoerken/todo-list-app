import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import Container from '../components/Container';
import CredentialsForm from '../components/CredentialsForm';

const SignInPage = () => {
	const navigate = useNavigate();
	const { user, signIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	}, [user, navigate]);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userInput = { email, password };
		await signIn({ userInput });
	};

	return (
		<Container classNames="flex">
			<section className="flex flex-col self-center mx-auto w-full max-w-lg p-6">
				<h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
				<CredentialsForm
					title="Sign In"
					email={email}
					onEmailChange={handleEmailChange}
					password={password}
					onPasswordChange={handlePasswordChange}
					onSubmit={handleSubmit}
					buttonLabel="Sign In"
					isEmailValid={true}
					isPasswordValid={true}
					showError={false}
				/>
				<p className="mt-6 text-center">
					Don't have an account?
					<br />
					<span className="inline-block text-blue-400 hover:underline">
						<Link to="/signup">Sign Up</Link>
					</span>
				</p>
			</section>
		</Container>
	);
};

export default SignInPage;
