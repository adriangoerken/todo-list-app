import React, { useState, useEffect } from 'react';
import Container from '../components/organisms/Container';
import Button from '../components/atoms/Button';
import TextField from '../components/atoms/TextField';
import PasswordField from '../components/molecules/PasswordField';
import { useTranslation } from 'react-i18next';
import { validateEmail, validatePassword } from '../utils/utils';
import H2 from '../components/atoms/H2';
import { useAuth } from '../providers/AuthContextProvider';

const SettingsPage = () => {
	const { user, deleteAccount } = useAuth();
	const [t, i18n] = useTranslation('global');
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmitDeleteAccount = async () => {
		if (confirm('Are you sure you want to delete your account?')) {
			deleteAccount();
		}
	};

	useEffect(() => {
		setValidEmail(validateEmail(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(validatePassword(password));
	}, [password]);

	return (
		<section>
			<Container className="flex flex-col gap-8 items-center justify-center max-w-lg">
				{/* Form Change Email */}
				<form className="flex flex-col gap-4 w-full">
					<H2 text="Change Email" />
					<div>
						<TextField
							placeholder="Enter new email"
							onchange={handleEmailChange}
							value={email}
							autoComplete="email"
							className={`${
								email && !validEmail
									? 'border-red-500 focus:border-red-500'
									: 'border-gray-600 focus:border-blue-700'
							}`}
						/>
						{email && !validEmail && (
							<span className="text-sm text-red-500 mt-1">
								{t('CredentialsForm.errEmail')}
							</span>
						)}
					</div>
					<Button
						value="Change Email"
						onclick={handleEmailChange}
						disabled={!validEmail}
					/>
				</form>
				<hr className="my-0" />
				{/* Form Change Password */}
				<form className="flex flex-col gap-4 w-full">
					<H2 text="Change Password" />
					<div>
						<PasswordField
							placeholder="Enter new password"
							onchange={handlePasswordChange}
							value={password}
							autoComplete="new-password"
							className={`${
								password && !validPassword
									? 'border-red-500 focus:border-red-500'
									: 'border-gray-600 focus:border-blue-700'
							}`}
						/>
						{password && !validPassword && (
							<span className="text-sm text-red-500 mt-1">
								{t('CredentialsForm.errPassword')}
							</span>
						)}
					</div>
					<Button
						value="Change Password"
						onclick={handlePasswordChange}
						disabled={!validPassword}
					/>
				</form>
				<hr className="my-0" />
				{/* Button delete account */}
				<div className="flex flex-col gap-4 w-full">
					<H2 text="Delete Account and Data" />
					<Button
						value="Delete Account"
						onclick={handleSubmitDeleteAccount}
						className="bg-red-700 hover:bg-red-800"
					/>
				</div>
			</Container>
		</section>
	);
};

export default SettingsPage;
