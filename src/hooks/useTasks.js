import { useState, useEffect } from 'react';
import { useSaveStatus } from '../providers/SaveStatusContextProvider';
import {
	fetchTasksAPI,
	addTaskAPI,
	deleteTaskAPI,
	updateTaskOrderAPI,
	updateTaskStatusAPI,
	updatePriorityAPI,
} from '../utils/taskApiService';
import { toast } from 'react-toastify';

const useTasks = (user, setUser, t, loading, setLoading) => {
	const { setIsSaving } = useSaveStatus();
	const [tasks, setTasks] = useState([]);

	// Fetch tasks from the database
	const fetchTasks = async () => {
		setLoading(true);
		const response = await fetchTasksAPI(user.accessToken);
		if (response.success) {
			setUser((prev) => ({
				...prev,
				accessToken: response.data.accessToken,
			}));
			setTasks(response.data.tasks);
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
		setLoading(false);
	};

	// Add a new task to the database
	const addTask = async (newTask) => {
		setIsSaving(true);
		const response = await addTaskAPI(newTask, user.accessToken);
		if (response.success) {
			toast.success(t('ToDoList.addTaskSuccess'));
			fetchTasks();
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
		setIsSaving(false);
	};

	// Delete task from the database
	const deleteTask = async (id, task_order) => {
		const response = await deleteTaskAPI(id, task_order, user.accessToken);
		if (response.success) {
			fetchTasks();
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
	};

	// Reorder tasks locally
	const moveTask = async (fromIndex, toIndex) => {
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
		await updateTaskOrderInDB(updatedTasks);
	};

	// Reorder tasks in the database
	const updateTaskOrderInDB = async (tasks) => {
		const response = await updateTaskOrderAPI(tasks, user.accessToken);

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			toast.success(t('ToDoList.updateTaskOrderSuccess'));
			fetchTasks();
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
	};

	// Update the status of a task
	const updateTaskStatus = async (id, isDone) => {
		const response = await updateTaskStatusAPI(
			id,
			isDone,
			user.accessToken
		);

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			toast.success(t('ToDoList.updateTaskStatusSuccess'));
			fetchTasks();
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
	};

	// Update the priority of a task
	const updatePriority = async (id, priority) => {
		const response = await updatePriorityAPI(
			id,
			priority,
			user.accessToken
		);

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			toast.success(t('ToDoList.updatePrioritySuccess'));
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
			fetchTasks();
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return {
		tasks,
		loading,
		addTask,
		deleteTask,
		moveTask,
		updateTaskStatus,
		updatePriority,
	};
};

export default useTasks;
