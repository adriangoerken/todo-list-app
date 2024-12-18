// import React from 'react';
import React from 'react';

const Button = ({ disabled = false, value, className = '', onclick }) => {
	const baseClasses =
		'bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition disabled:opacity-50';

	return (
		<button
			onClick={onclick}
			disabled={disabled}
			className={`${baseClasses} ${'w-full'} ${className}`}
		>
			{value}
		</button>
	);
};

export default Button;
