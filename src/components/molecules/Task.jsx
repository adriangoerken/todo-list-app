import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import Select from '../atoms/Select';
import DeleteButton from '../atoms/DeleteButton';
import { MdDragHandle } from 'react-icons/md';
import Checkbox from '../atoms/Checkbox';
import { useTranslation } from 'react-i18next';

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
	const [t] = useTranslation('global');
	const priorityOptions = [
		{ value: 1, label: t('Task.selectOpts.optHigh') },
		{ value: 2, label: t('Task.selectOpts.optNormal') },
		{ value: 3, label: t('Task.selectOpts.optLow') },
	];
	let initialIndex = index;

	const handleCheckboxChange = (e) => {
		setChecked((prevChecked) => !prevChecked);
		updateStatus(taskId, e.target.checked);
	};

	const handleDeleteTask = () => {
		if (confirm(t('Task.delTaskConf'))) {
			deleteTask(taskId, taskOrder);
		}
	};

	const handlePriorityChange = (e) => {
		setSelectValue(e.target.value);
		updatePriority(taskId, parseInt(e.target.value));
	};

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

	drag(drop(ref));

	return (
		<div
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className="flex items-center justify-between p-4 border-2 rounded-lg font-bold border-gray-600 cursor-move"
		>
			<div className="flex items-center flex-grow gap-2 min-w-0">
				<Checkbox checked={checked} onChange={handleCheckboxChange} />
				<span
					className={`break-words flex-grow ${
						checked ? 'line-through opacity-50' : ''
					}`}
				>
					{task}
				</span>
			</div>
			<div className="flex items-center gap-2 ml-4">
				<Select
					onChange={handlePriorityChange}
					value={selectValue}
					options={priorityOptions}
				/>
				<DeleteButton onClick={handleDeleteTask} />
				<MdDragHandle className="cursor-pointer text-xl" />
			</div>
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
