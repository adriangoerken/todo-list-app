import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import TextField from '../atoms/TextField';
import Button from '../atoms/Button';
import { useTranslation } from 'react-i18next';

const AddTaskForm = ({ addTask }) => {
	const [t] = useTranslation('global');
	const [newTask, setNewTask] = useState('');
	const [validTask, setValidTask] = useState(false);

	const handleInputChange = (e) => {
		setNewTask(e.target.value);
	};

	const handleAddTask = async (e) => {
		e.preventDefault();
		addTask(newTask);
		setNewTask('');
	};

	useEffect(() => {
		setValidTask(!!newTask);
	}, [newTask]);

	return (
		<form className="flex gap-2 w-[100%] self-center">
			<TextField
				placeholder={t('ToDoList.form.formPlaceholder')}
				value={newTask}
				autoComplete="off"
				onChange={handleInputChange}
			/>
			<Button
				value={t('ToDoList.form.formBtnAdd')}
				onClick={handleAddTask}
				disabled={!validTask}
				className="max-w-fit px-6 cursor-pointer"
			/>
		</form>
	);
};

AddTaskForm.propTypes = {
	addTask: propTypes.func.isRequired,
};

export default AddTaskForm;
