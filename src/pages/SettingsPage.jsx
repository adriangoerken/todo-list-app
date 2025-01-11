import React, { useState, useEffect } from 'react';
import Container from '../components/organisms/Container';
import Button from '../components/atoms/Button';
import TextField from '../components/atoms/TextField';
import PasswordField from '../components/molecules/PasswordField';
import { useTranslation } from 'react-i18next';
import { validateEmail, validatePassword } from '../utils/utils';
import H2 from '../components/atoms/H2';
import { useAuth } from '../providers/AuthContextProvider';
import { putData } from '../api/api';
import Loader from '../components/atoms/Loader';
import { toast } from 'react-toastify';

const SettingsPage = () => {
	const [loading, setLoading] = useState(false);
	const { user, setUser, deleteAccount } = useAuth();
	const [t, i18n] = useTranslation('global');
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmitEmailChange = async (e) => {
		e.preventDefault();
		setLoading(true);

		const url =
			'http://localhost/projects/todo-list-app/backend/api/user/updateemail';
		const response = await putData(url, { email }, user.accessToken);

		if (response.success) {
			setEmail('');
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
				email,
			}));
			toast.success(t('SettingsPage.email.changeEmailSuccess'));
			setLoading(false);
		} else {
			setLoading(false);

			if (response.errorType !== 'invalid_refresh_token') {
				setTimeout(() => {
					toast.error(response.error || t('GLOBAL.errDefault'));
				}, 1);
			}
		}
	};

	const handleSubmitPasswordChange = async (e) => {
		e.preventDefault();
		setLoading(true);

		const url =
			'http://localhost/projects/todo-list-app/backend/api/user/updatepassword';
		const response = await putData(url, { password }, user.accessToken);

		if (response.success) {
			setPassword('');
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));
			toast.success(t('SettingsPage.password.changePasswordSuccess'));
			setLoading(false);
		} else {
			setLoading(false);

			if (response.errorType !== 'invalid_refresh_token') {
				setTimeout(() => {
					toast.error(response.error || t('GLOBAL.errDefault'));
				}, 1);
			}
		}
	};

	const handleSubmitDeleteAccount = async () => {
		if (confirm(t('SettingsPage.delAccConfirm'))) {
			deleteAccount();
		}
	};

	useEffect(() => {
		setValidEmail(validateEmail(email) && email !== user.email);
	}, [email]);

	useEffect(() => {
		setValidPassword(validatePassword(password));
	}, [password]);

	if (loading) {
		return <Loader />;
	}

	return (
		<section>
			<Container className="flex flex-col gap-8 items-center justify-center max-w-lg">
				{/* Form Change Email */}
				<form className="flex flex-col gap-4 w-full">
					<H2 text={t('SettingsPage.email.headerEmail')} />
					<div>
						<TextField
							placeholder={t(
								'SettingsPage.email.inputEmailPlaceholder'
							)}
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
						value={t('SettingsPage.email.btnSaveEmail')}
						onclick={handleSubmitEmailChange}
						disabled={!validEmail}
					/>
				</form>
				<hr className="my-0" />
				{/* Form Change Password */}
				<form className="flex flex-col gap-4 w-full">
					<H2 text={t('SettingsPage.password.headerPassword')} />
					<div>
						<PasswordField
							placeholder={t(
								'SettingsPage.password.inputPasswordPlaceholder'
							)}
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
						value={t('SettingsPage.password.btnSavePassword')}
						onclick={handleSubmitPasswordChange}
						disabled={!validPassword}
					/>
				</form>
				<hr className="my-0" />
				{/* Button delete account */}
				<div className="flex flex-col gap-4 w-full">
					<H2 text={t('SettingsPage.account.headerDelAccount')} />
					<Button
						value={t('SettingsPage.account.btnDelAcc')}
						onclick={handleSubmitDeleteAccount}
						className="bg-red-700 hover:bg-red-800"
					/>
				</div>
			</Container>
		</section>
	);
};

export default SettingsPage;
