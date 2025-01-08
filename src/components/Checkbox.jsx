import React from 'react';
import PropTypes from 'prop-types';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

const Checkbox = ({ checked, onchange }) => {
	return (
		<label className="inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				checked={checked}
				onChange={onchange}
				className="hidden"
			/>
			{checked ? (
				<MdCheckBox className="text-xl" />
			) : (
				<MdCheckBoxOutlineBlank className="text-xl" />
			)}
		</label>
	);
};

Checkbox.propTypes = {
	checked: PropTypes.bool.isRequired,
	onchange: PropTypes.func.isRequired,
};

export default Checkbox;
