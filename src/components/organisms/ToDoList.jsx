import React, { useState } from 'react';
import Loader from '../atoms/Loader';
import { useAuth } from '../../providers/AuthContextProvider';
import { useTranslation } from 'react-i18next';
import TaskList from './TaskList';
import AddTaskForm from '../molecules/AddTaskForm';
import useTasks from '../../hooks/useTasks';

const ToDoList = () => {
	const { user, setUser } = useAuth();
	const [loading, setLoading] = useState(true);
	const [t] = useTranslation('global');
	const {
		tasks,
		addTask,
		deleteTask,
		moveTask,
		updateTaskStatus,
		updatePriority,
	} = useTasks(user, setUser, t, loading, setLoading);

	if (loading) {
		return <Loader />;
	}

	return (
		<section className="flex flex-col gap-10">
			<AddTaskForm addTask={addTask} />
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
