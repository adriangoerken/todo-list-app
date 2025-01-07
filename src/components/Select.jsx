import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ onchange, value, options }) => {
	return (
		<select onChange={onchange} value={value}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
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
};

export default Select;
