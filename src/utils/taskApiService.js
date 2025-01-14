import { getData, postData, deleteData, putData } from '../api/api';

export const addTaskAPI = async (task, token) => {
	const url =
		'http://localhost/projects/todo-list-app/backend/api/tasks/addtask';
	return await postData(url, { task }, token);
};

export const deleteTaskAPI = async (id, task_order, token) => {
	const url = `http://localhost/projects/todo-list-app/backend/api/tasks/deletetask?id=${id}&task_order=${task_order}`;
	return await deleteData(url, token);
};

export const fetchTasksAPI = async (token) => {
	const url =
		'http://localhost/projects/todo-list-app/backend/api/tasks/gettasks';
	return await getData(url, token);
};

// Similarly, export functions for `fetchTasks`, `updateTaskOrder`, etc.
