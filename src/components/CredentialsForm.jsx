import React from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';
import PasswordField from './PasswordField';
import Button from './Button';

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
	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="flex flex-col">
				<label htmlFor="email" className="mb-2 text-sm font-medium">
					Email
				</label>
				<TextField
					placeholder="Email"
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
						Please enter a valid email.
					</span>
				)}
			</div>
			<div className="flex flex-col">
				<label htmlFor="password" className="mb-2 text-sm font-medium">
					Password
				</label>
				<PasswordField
					placeholder="Password"
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
						Password must be at least 12 characters long and include
						at least one uppercase letter, one number, and one
						special character: @$!%*?&.
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
