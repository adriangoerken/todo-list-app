import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import Container from '../components/organisms/Container';
import CredentialsForm from '../components/organisms/CredentialsForm';
import { useTranslation } from 'react-i18next';

const SignInPage = () => {
	const navigate = useNavigate();
	const { user, signIn } = useAuth();
	const [t, n18i] = useTranslation('global');
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
		<Container className="flex flex-grow justify-center">
			<section className="flex flex-col self-center w-full max-w-lg p-6 justify-center">
				<h1 className="text-3xl font-bold mb-8 text-center">
					{t('SignInPage.header')}
				</h1>
				<CredentialsForm
					title="Sign In"
					email={email}
					onEmailChange={handleEmailChange}
					password={password}
					onPasswordChange={handlePasswordChange}
					onSubmit={handleSubmit}
					buttonLabel={t('SignInPage.btnSignIn')}
					isEmailValid={true}
					isPasswordValid={true}
					showError={false}
				/>
				<p className="mt-6 text-center">
					{t('SignInPage.question')}
					<br />
					<Link to="/signup" className="hover:underline">
						{t('SignInPage.questionButton')}
					</Link>
				</p>
			</section>
		</Container>
	);
};

export default SignInPage;
