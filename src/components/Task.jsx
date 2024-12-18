import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Task = ({ task, index, deleteTask, moveTask }) => {
	const ref = useRef(null);
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

	drag(drop(ref));

	return (
		<div
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className="py-4 border-2 rounded-lg border-green-900 hover:cursor-pointer"
		>
			<span className="text">{task}</span>{' '}
			<button onClick={() => deleteTask(index)} className="btn-delete">
				Delete
			</button>
		</div>
	);
};

export default Task;
