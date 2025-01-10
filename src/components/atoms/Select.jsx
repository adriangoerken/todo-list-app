import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ onchange, value, options, className }) => {
	return (
		<select
			onChange={onchange}
			value={value}
			className={`border-2 border-gray-600 rounded-lg bg-transparent p-1 cursor-pointer ${className}`}
		>
			{options.map((option) => (
				<option
					key={option.value}
					value={option.value}
					className="bg-gray-900"
				>
					{option.label}
				</option>
			))}
		</select>
	);
};

Select.propTypes = {
	onchange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	className: PropTypes.string,
};

export default Select;
