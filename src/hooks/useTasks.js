// hooks/useTasks.js
import { useState, useEffect } from 'react';
import {
	fetchTasksAPI,
	addTaskAPI,
	deleteTaskAPI,
} from '../utils/taskApiService';

const useTasks = (user, setUser, t) => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

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

	const addTask = async (newTask) => {
		const response = await addTaskAPI(newTask, user.accessToken);
		if (response.success) {
			fetchTasks();
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
	};

	const deleteTask = async (id, task_order) => {
		const response = await deleteTaskAPI(id, task_order, user.accessToken);
		if (response.success) {
			fetchTasks();
		} else {
			handleError(response.error || t('GLOBAL.errDefault'));
		}
	};

	// Add similar methods for updating tasks, priorities, etc.

	useEffect(() => {
		fetchTasks();
	}, []);

	return { tasks, loading, addTask, deleteTask, fetchTasks };
};

export default useTasks;
