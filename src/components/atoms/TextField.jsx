import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
	placeholder,
	onChange,
	value,
	className,
	autoComplete,
	type = 'text',
	isRequired = true,
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			autoComplete={autoComplete}
			{...(isRequired && { required: true })}
			className={`w-full p-4 bg-transparent outline-none border-2 rounded-lg border-gray-600 focus:border-blue-700 ${className}`}
		/>
	);
};

TextField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	autoComplete: PropTypes.string.isRequired,
	className: PropTypes.string,
	type: PropTypes.string,
	isRequired: PropTypes.bool,
};

export default TextField;
