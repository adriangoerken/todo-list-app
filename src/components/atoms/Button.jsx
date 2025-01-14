import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ disabled = false, value, className = '', onClick }) => {
	const baseClasses =
		'bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition disabled:opacity-50 w-full';

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${className}`}
		>
			{value}
		</button>
	);
};

Button.propTypes = {
	disabled: PropTypes.bool,
	value: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

export default Button;
