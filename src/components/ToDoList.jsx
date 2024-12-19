import React, { useEffect, useState } from 'react';
import Task from './Task';
import Loader from '../components/Loader';
import { getData, putData, postData, deleteData } from '../api/api';
import { useAuth } from '../providers/AuthContextProvider';
import { toast } from 'react-toastify';
import Button from './Button';

const ToDoList = () => {
	const { user, setUser } = useAuth();
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [validTask, setValidTask] = useState(false);

	const handleInputChange = (e) => {
		setNewTask(e.target.value);
	};

	const addTask = async () => {
		if (newTask.trim() !== '') {
			setLoading(true);
			const url =
				'http://localhost/projects/todo-list-app/backend/api/tasks/addtask';
			const response = await postData(
				url,
				{ task: newTask },
				user.accessToken
			);

			if (response.success) {
				setNewTask('');
				setUser((prevUser) => ({
					...prevUser,
					accessToken: response.data.accessToken,
				}));

				toast.success('New task added successfully!');
				fetchTasks();
			} else {
				setTimeout(() => {
					setLoading(false);
					toast.error(
						response.error ||
							'Something went wrong. Please try again.'
					);
				}, 1);
			}
		}
	};

	const deleteTask = async (id, task_order) => {
		// TODO: Implement logic for is_done
		// TODO: Implement priority/favorite; add db column(bool)

		setLoading(true);

		const url = `http://localhost/projects/todo-list-app/backend/api/tasks/deletetask?id=${id}&task_order=${task_order}`;
		const response = await deleteData(url, user.accessToken);

		if (response.success) {
			setNewTask('');
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			toast.success('Task deleted successfully!');
			fetchTasks();
		} else {
			setTimeout(() => {
				setLoading(false);
				toast.error(
					response.error || 'Something went wrong. Please try again.'
				);
			}, 1);
		}
	};

	const moveTask = (fromIndex, toIndex) => {
		const updatedTasks = [...tasks];
		const [movedTask] = updatedTasks.splice(fromIndex, 1);

		updatedTasks.splice(toIndex, 0, movedTask);

		// Update task_order for each task
		updatedTasks.forEach((task, index) => {
			task.task_order = index + 1;
		});

		setTasks(updatedTasks);
		updateTaskOrderInDB(updatedTasks);
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

	useEffect(() => {
		setValidTask(!!newTask);
	}, [newTask]);

	if (loading) {
		return <Loader />;
	}

	return (
		<section>
			<div>
				<input
					type="text"
					placeholder="Enter a task..."
					value={newTask}
					onChange={handleInputChange}
					required
				/>
				<Button value="Add" onclick={addTask} disabled={!validTask} />
			</div>
			<section>
				{tasks.map((task, index) => (
					<Task
						key={task.id}
						task={task.task}
						task_id={task.id}
						task_order={task.task_order}
						index={index}
						deleteTask={deleteTask}
						moveTask={moveTask}
					/>
				))}
			</section>
		</section>
	);
};

export default ToDoList;
