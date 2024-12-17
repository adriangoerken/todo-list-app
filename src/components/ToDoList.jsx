import React, { useState } from 'react';

const ToDoList = () => {
	const [tasks, setTasks] = useState([
		'Eat Breakfast',
		'Take a shower',
		'Walk the dog',
	]);
	const [newTask, setNewTask] = useState('');

	const handleInputChange = (e) => {
		setNewTask(e.target.value);
	};

	const addTask = () => {
		if (newTask.trim() !== '') {
			setTasks((t) => [...t, newTask]);
			setNewTask('');
		}
	};

	const deleteTask = (index) => {
		const updatedTasks = tasks.filter((_, i) => i !== index);
		setTasks(updatedTasks);
	};

	const moveTaskUp = (index) => {
		if (index > 0 && index < tasks.length) {
			const updatedTasks = [...tasks];
			[updatedTasks[index], updatedTasks[index - 1]] = [
				updatedTasks[index - 1],
				updatedTasks[index],
			];

			setTasks(updatedTasks);
		}
	};

	const moveTaskDown = (index) => {
		if (index < tasks.length - 1) {
			const updatedTasks = [...tasks];
			[updatedTasks[index], updatedTasks[index + 1]] = [
				updatedTasks[index + 1],
				updatedTasks[index],
			];

			setTasks(updatedTasks);
		}
	};

	return (
		<section>
			<h1>ToDo-List</h1>
			<div>
				<input
					type="text"
					placeholder="Enter a task..."
					value={newTask}
					onChange={handleInputChange}
					className="text-black"
				/>
				<button onClick={addTask} className="btn-add">
					Add
				</button>
			</div>
			<ol>
				{tasks.map((task, index) => (
					<li key={index}>
						<span className="text">{task}</span>
						<button
							onClick={() => deleteTask(index)}
							className="btn-delete"
						>
							Delete
						</button>
						<button
							onClick={() => moveTaskUp(index)}
							className="btn-move-up"
						>
							MoveUp
						</button>
						<button
							onClick={() => moveTaskDown(index)}
							className="btn-move-down"
						>
							MoveDown
						</button>
					</li>
				))}
			</ol>
		</section>
	);
};

export default ToDoList;
