import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
	placeholder,
	onchange,
	value,
	className,
	type = 'text',
	isRequired = true,
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onchange}
			{...(isRequired && { required: true })}
			className={`w-full px-4 pt-3 pb-3 p-4 bg-transparent outline-none border-2 rounded-lg border-gray-600 focus:border-blue-700 ${className}`}
		/>
	);
};

TextField.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onchange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	className: PropTypes.string,
	type: PropTypes.string,
	isRequired: PropTypes.bool,
};

export default TextField;
