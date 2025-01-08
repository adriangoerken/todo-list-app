import React, { useEffect, useState } from 'react';
import Task from './Task';
import Loader from '../components/Loader';
import { getData, putData, postData, deleteData } from '../api/api';
import { useAuth } from '../providers/AuthContextProvider';
import { toast } from 'react-toastify';
import Button from './Button';
import TextField from './TextField';

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

		// Update the task_order for each task
		updatedTasks.forEach((task, index) => {
			task.task_order = index + 1;
		});

		// Sort the tasks by priority and then by task_order
		updatedTasks.sort((a, b) => {
			if (a.priority === b.priority) {
				return a.task_order - b.task_order;
			}
			return a.priority - b.priority;
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

	const updateTaskStatus = async (id, isDone) => {
		const url =
			'http://localhost/projects/todo-list-app/backend/api/tasks/updatetaskstatus';
		const response = await putData(url, { id, isDone });

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

	const updatePriority = async (id, priority) => {
		const url =
			'http://localhost/projects/todo-list-app/backend/api/tasks/updatetaskpriority';
		const response = await putData(url, { id, priority });

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			setTasks((prevTasks) => {
				// Update the priority of the task
				const updatedTasks = prevTasks.map((task) =>
					task.id === id ? { ...task, priority } : task
				);

				// Sort by priority (ascending) and then by task_order (ascending)
				updatedTasks.sort((a, b) => {
					if (a.priority === b.priority) {
						return a.task_order - b.task_order;
					}
					return a.priority - b.priority;
				});

				return updatedTasks;
			});
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
		<section className="flex flex-col gap-10">
			<div className="flex gap-2 w-[90%] self-center">
				<TextField
					placeholder="Enter a task..."
					value={newTask}
					onchange={handleInputChange}
				/>
				<Button
					value="Add"
					onclick={addTask}
					disabled={!validTask}
					className="max-w-fit px-6 cursor-pointer"
				/>
			</div>
			<section>
				{tasks.map((task, index) => (
					<Task
						key={task.id}
						task={task.task}
						taskId={task.id}
						taskOrder={task.task_order}
						priority={task.priority}
						isDone={task.is_done === 0 ? false : true}
						index={index}
						deleteTask={deleteTask}
						moveTask={moveTask}
						updateStatus={updateTaskStatus}
						updatePriority={updatePriority}
					/>
				))}
			</section>
		</section>
	);
};

export default ToDoList;
