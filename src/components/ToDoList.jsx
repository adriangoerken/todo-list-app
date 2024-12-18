import React, { useEffect, useState } from 'react';
import Task from './Task';
import Loader from '../components/Loader';
import { getData, putData } from '../api/api';
import { useAuth } from '../providers/AuthContextProvider';
import { toast } from 'react-toastify';

const ToDoList = () => {
	const { user, setUser } = useAuth();
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);
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

	const moveTask = (fromIndex, toIndex) => {
		const updatedTasks = [...tasks];
		const [movedTask] = updatedTasks.splice(fromIndex, 1);
		updatedTasks.splice(toIndex, 0, movedTask);

		setTasks(updatedTasks);
		updateTaskOrderInDB(updatedTasks);
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

	const fetchTasks = async () => {
		setLoading(true);

		const url =
			'http://localhost/projects/todo-list-app/backend/api/tasks/gettasks';

		const response = await getData(url, user.accessToken);

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));
			setTasks(response.data.tasks);
			setLoading(false);
		} else {
			setTimeout(() => {
				toast.error(
					response.error || 'Something went wrong. Please try again.'
				);
			}, 1);
		}
	};

	const updateTaskOrderInDB = async (tasks) => {
		const url =
			'http://localhost/projects/todo-list-app/backend/api/tasks/updatetasksorder';
		const response = await putData(url, { tasks });

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));
		} else {
			setTimeout(() => {
				toast.error(
					response.error || 'Something went wrong. Please try again.'
				);
			}, 1);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	if (loading) {
		return <Loader />;
	}

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
					<Task
						key={index}
						task={task.task}
						index={index}
						deleteTask={deleteTask}
						moveTask={moveTask}
						moveTaskUp={moveTaskUp}
						moveTaskDown={moveTaskDown}
					/>
				))}
			</ol>
		</section>
	);
};

export default ToDoList;
