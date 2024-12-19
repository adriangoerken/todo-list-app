import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { MdDeleteForever } from 'react-icons/md';

const Task = ({
	task,
	taskId,
	taskOrder,
	isDone,
	index,
	deleteTask,
	moveTask,
	updateStatus,
}) => {
	const ref = useRef(null);
	const [checked, setChecked] = useState(isDone);
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

	drag(drop(ref));

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
			<button onClick={() => deleteTask(taskId, taskOrder)}>
				<MdDeleteForever />
			</button>
		</div>
	);
};

Task.propTypes = {
	task: PropTypes.string.isRequired,
	taskId: PropTypes.number.isRequired,
	taskOrder: PropTypes.number.isRequired,
	isDone: PropTypes.bool.isRequired,
	index: PropTypes.number.isRequired,
	deleteTask: PropTypes.func.isRequired,
	moveTask: PropTypes.func.isRequired,
	updateStatus: PropTypes.func.isRequired,
};

export default Task;
