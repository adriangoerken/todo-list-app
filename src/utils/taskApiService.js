import { getData, postData, deleteData, putData } from '../api/api';

export const fetchTasksAPI = async (token) => {
	const url = 'https://api.adriangoerken.de/taskdoneify//api/tasks/gettasks';
	return await getData(url, token);
};

export const addTaskAPI = async (task, token) => {
	const url = 'https://api.adriangoerken.de/taskdoneify//api/tasks/addtask';
	return await postData(url, { task }, token);
};

export const deleteTaskAPI = async (id, task_order, token) => {
	const url = `https://api.adriangoerken.de/taskdoneify//api/tasks/deletetask?id=${id}&task_order=${task_order}`;
	return await deleteData(url, token);
};

export const updateTaskOrderAPI = async (tasks, token) => {
	const url =
		'https://api.adriangoerken.de/taskdoneify//api/tasks/updatetasksorder';
	return await putData(url, { tasks }, token);
};

export const updateTaskStatusAPI = async (id, isDone, token) => {
	const url =
		'https://api.adriangoerken.de/taskdoneify//api/tasks/updatetaskstatus';
	return await putData(url, { id, isDone }, token);
};

export const updatePriorityAPI = async (id, priority, token) => {
	const url =
		'https://api.adriangoerken.de/taskdoneify//api/tasks/updatetaskpriority';
	return await putData(url, { id, priority }, token);
};
