import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '../atoms/TextField';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const PasswordField = ({
	placeholder,
	onChange,
	value,
	autoComplete,
	className,
	isRequired,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

	return (
		<div className="relative">
			<TextField
				type={showPassword ? 'text' : 'password'}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				autoComplete={autoComplete}
				className={`pr-10 ${className}`}
				isRequired={isRequired}
			/>
			<button
				type="button"
				onClick={togglePasswordVisibility}
				className="absolute inset-y-0 right-2 px-2 text-gray-400 hover:text-gray-200"
			>
				{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
			</button>
		</div>
	);
};

PasswordField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	autoComplete: PropTypes.string.isRequired,
	className: PropTypes.string,
	isRequired: PropTypes.bool,
};

export default PasswordField;
