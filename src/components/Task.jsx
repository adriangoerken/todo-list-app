import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import Select from './Select';
import DeleteButton from './DeleteButton';

const Task = ({
	task,
	taskId,
	taskOrder,
	priority,
	isDone,
	index,
	deleteTask,
	moveTask,
	updateStatus,
	updatePriority,
}) => {
	const ref = useRef(null);
	const [checked, setChecked] = useState(isDone);
	const [selectValue, setSelectValue] = useState(priority);
	const priorityOptions = [
		{ value: 1, label: 'High' },
		{ value: 2, label: 'Normal' },
		{ value: 3, label: 'Low' },
	];
	let initialIndex = index;

	const [, drop] = useDrop({
		accept: 'TASK',
		hover(item) {
			if (item.index !== index) {
				item.index = index;
			}
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'TASK',
		item: { type: 'TASK', index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end: (item, _) => {
			if (item.index !== initialIndex) {
				moveTask(initialIndex, item.index);
			}
		},
	});

	const handleCheckboxChange = (e) => {
		setChecked((prevChecked) => !prevChecked);
		updateStatus(taskId, e.target.checked);
	};

	const handleDeleteTask = () => {
		deleteTask(taskId, taskOrder);
	};

	const handlePriorityChange = (e) => {
		setSelectValue(e.target.value);
		updatePriority(taskId, parseInt(e.target.value));
	};

	drag(drop(ref));
	// TODO: Styling for entire site; also specifically for this component

	return (
		<div
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className="py-4 border-2 rounded-lg border-green-900 hover:cursor-pointer"
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={handleCheckboxChange}
			/>
			<span className={checked ? 'line-through' : ''}>{task}</span>
			<Select
				onchange={handlePriorityChange}
				value={selectValue}
				options={priorityOptions}
			/>
			<DeleteButton onclick={handleDeleteTask} />
		</div>
	);
};

Task.propTypes = {
	task: PropTypes.string.isRequired,
	taskId: PropTypes.number.isRequired,
	taskOrder: PropTypes.number.isRequired,
	priority: PropTypes.number.isRequired,
	isDone: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	deleteTask: PropTypes.func.isRequired,
	moveTask: PropTypes.func.isRequired,
	updateStatus: PropTypes.func.isRequired,
	updatePriority: PropTypes.func.isRequired,
};

export default Task;
