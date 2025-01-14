import React, { useEffect, useState } from 'react';
import Loader from '../atoms/Loader';
import { getData, putData, postData, deleteData } from '../../api/api';
import { useAuth } from '../../providers/AuthContextProvider';
import { toast } from 'react-toastify';
import { useSaveStatus } from '../../providers/SaveStatusContextProvider';
import { useTranslation } from 'react-i18next';
import { handleError } from '../../utils/errorHandler';
import TaskList from './TaskList';
import AddTaskForm from '../molecules/AddTaskForm';

const ToDoList = () => {
	const { user, setUser } = useAuth();
	const { setIsSaving } = useSaveStatus();
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [validTask, setValidTask] = useState(false);
	const [t, n18i] = useTranslation('global');

	const handleInputChange = (e) => {
		setNewTask(e.target.value);
	};

	const addTask = async () => {
		if (newTask.trim() !== '') {
			setLoading(true);
			setIsSaving(true);

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

				toast.success(t('ToDoList.addTaskSuccess'));
				fetchTasks();
			} else {
				setTimeout(() => {
					setLoading(false);
					setIsSaving(false);
					handleError(response.error || t('GLOBAL.errDefault'));
				}, 1);
			}
		}
	};

	const deleteTask = async (id, task_order) => {
		setLoading(true);
		setIsSaving(true);

		const url = `http://localhost/projects/todo-list-app/backend/api/tasks/deletetask?id=${id}&task_order=${task_order}`;
		const response = await deleteData(url, user.accessToken);

		if (response.success) {
			setNewTask('');
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			toast.success(t('ToDoList.delTaskSuccess'));
			fetchTasks();
		} else {
			setTimeout(() => {
				setLoading(false);
				setIsSaving(false);
				handleError(response.error || t('GLOBAL.errDefault'));
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
		setIsSaving(true);

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
			setIsSaving(false);
		} else {
			setTimeout(() => {
				handleError(response.error || t('GLOBAL.errDefault'));
			}, 1);
		}
	};

	const updateTaskOrderInDB = async (tasks) => {
		setIsSaving(true);

		const url =
			'http://localhost/projects/todo-list-app/backend/api/tasks/updatetasksorder';
		const response = await putData(url, { tasks });

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			setIsSaving(false);
		} else {
			setTimeout(() => {
				handleError(response.error || t('GLOBAL.errDefault'));
			}, 1);
		}
	};

	const updateTaskStatus = async (id, isDone) => {
		setIsSaving(true);

		const url =
			'http://localhost/projects/todo-list-app/backend/api/tasks/updatetaskstatus';
		const response = await putData(url, { id, isDone });

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			setIsSaving(false);
		} else {
			setTimeout(() => {
				handleError(response.error || t('GLOBAL.errDefault'));
			}, 1);
		}
	};

	const updatePriority = async (id, priority) => {
		setIsSaving(true);

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
			setIsSaving(false);
		} else {
			setTimeout(() => {
				handleError(response.error || t('GLOBAL.errDefault'));
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
			<AddTaskForm
				value={newTask}
				onChange={handleInputChange}
				onSubmit={addTask}
				disabled={!newTask.trim()}
				placeholder={t('ToDoList.form.formPlaceholder')}
				buttonText={t('ToDoList.form.formBtnAdd')}
			/>
			<TaskList
				tasks={tasks}
				deleteTask={deleteTask}
				moveTask={moveTask}
				updateTaskStatus={updateTaskStatus}
				updatePriority={updatePriority}
			/>
		</section>
	);
};

export default ToDoList;

/* TODO: New Component
const ToDoList = () => {
  const { user, setUser } = useAuth();
  const { setIsSaving } = useSaveStatus();
  const [newTask, setNewTask] = useState('');
  const { t } = useTranslation('global');
  const { tasks, loading, addTask, deleteTask } = useTasks(user, setUser, t);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setIsSaving(true);
      addTask(newTask);
      setNewTask('');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-10">
      <form className="flex gap-2 w-[100%] self-center">
        <TextField
          placeholder={t('ToDoList.form.formPlaceholder')}
          value={newTask}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <Button
          value={t('ToDoList.form.formBtnAdd')}
          onClick={handleAddTask}
          disabled={!newTask.trim()}
          className="max-w-fit px-6 cursor-pointer"
        />
      </form>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </section>
  );
};
 */
/*
TODO: Additional Improvements
	Separate UI Components: Extract reusable components like TaskList, TextField, Button, etc.
	Error Handling: Centralize error handling in a utility or hook.
	Constants: Store URLs and other constants in a separate constants.js file.
	Loading and Saving States: Handle states like setIsSaving in hooks or context if they span multiple components.
 */
