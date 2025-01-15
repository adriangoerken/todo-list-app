import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthContextProvider';
import Container from '../components/organisms/Container';
import CredentialsForm from '../components/organisms/CredentialsForm';
import { useTranslation } from 'react-i18next';
import { validateEmail, validatePassword } from '../utils/utils';

const SignUpPage = () => {
	const navigate = useNavigate();
	const [t] = useTranslation('global');
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
		setValidEmail(validateEmail(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(validatePassword(password));
	}, [password]);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = { email, password };

		await signUp(newUser);
	};

	return (
		<Container className="flex flex-grow justify-center">
			<section className="flex flex-col self-center w-full max-w-lg p-6 justify-center">
				<h1 className="text-3xl font-bold mb-8 text-center">
					{t('SignUpPage.header')}
				</h1>
				<CredentialsForm
					email={email}
					onEmailChange={handleEmailChange}
					password={password}
					onPasswordChange={handlePasswordChange}
					onSubmit={handleSubmit}
					buttonLabel={t('SignUpPage.btnSignUp')}
					isEmailValid={validEmail}
					isPasswordValid={validPassword}
					showError={true}
				/>
				<p className="mt-6 text-center">
					{t('SignUpPage.question')} <br />
					<Link to="/signin" className="hover:underline">
						{t('SignUpPage.questionButton')}
					</Link>
				</p>
			</section>
		</Container>
	);
};

export default SignUpPage;
