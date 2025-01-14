import React from 'react';
import propTypes from 'prop-types';
import TextField from '../atoms/TextField';
import Button from '../atoms/Button';

const AddTaskForm = ({
	value,
	onChange,
	onSubmit,
	disabled,
	placeholder,
	buttonText,
}) => {
	return (
		<form className="flex gap-2 w-[100%] self-center">
			<TextField
				placeholder={placeholder}
				value={value}
				autoComplete="off"
				onChange={onChange}
			/>
			<Button
				value={buttonText}
				onClick={onSubmit}
				disabled={disabled}
				className="max-w-fit px-6 cursor-pointer"
			/>
		</form>
	);
};

AddTaskForm.propTypes = {
	value: propTypes.string.isRequired,
	onChange: propTypes.func.isRequired,
	onSubmit: propTypes.func.isRequired,
	disabled: propTypes.bool.isRequired,
	placeholder: propTypes.string.isRequired,
	buttonText: propTypes.string.isRequired,
};

export default AddTaskForm;
