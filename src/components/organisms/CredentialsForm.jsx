import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../atoms/TextField';
import PasswordField from '../molecules/PasswordField';
import Button from '../atoms/Button';
import { useTranslation } from 'react-i18next';

const CredentialsForm = ({
	email,
	onEmailChange,
	password,
	onPasswordChange,
	onSubmit,
	buttonLabel,
	isEmailValid,
	isPasswordValid,
	showError,
}) => {
	const [t, n18i] = useTranslation('global');

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="flex flex-col">
				<label htmlFor="email" className="mb-2 text-sm font-medium">
					{t('CredentialsForm.email')}
				</label>
				<TextField
					placeholder={t('CredentialsForm.email')}
					onchange={onEmailChange}
					value={email}
					className={`${
						email && !isEmailValid
							? 'border-red-500 focus:border-red-500'
							: 'border-gray-600 focus:border-blue-700'
					}`}
				/>
				{showError && email && !isEmailValid && (
					<span className="text-sm text-red-500 mt-1">
						{t('CredentialsForm.errEmail')}
					</span>
				)}
			</div>
			<div className="flex flex-col">
				<label htmlFor="password" className="mb-2 text-sm font-medium">
					{t('CredentialsForm.password')}
				</label>
				<PasswordField
					placeholder={t('CredentialsForm.password')}
					onchange={onPasswordChange}
					value={password}
					className={`${
						password && !isPasswordValid
							? 'border-red-500 focus:border-red-500'
							: 'border-gray-600 focus:border-blue-700'
					}`}
				/>
				{showError && password && !isPasswordValid && (
					<span className="text-sm text-red-500 mt-1">
						{t('CredentialsForm.errPassword')}
					</span>
				)}
			</div>
			<Button
				value={buttonLabel}
				onclick={onSubmit}
				disabled={showError && (!isEmailValid || !isPasswordValid)}
			/>
		</form>
	);
};

CredentialsForm.propTypes = {
	email: PropTypes.string.isRequired,
	onEmailChange: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	buttonLabel: PropTypes.string.isRequired,
	isEmailValid: PropTypes.bool,
	isPasswordValid: PropTypes.bool,
	showError: PropTypes.bool,
};

export default CredentialsForm;
