import React from 'react';
import Task from '../molecules/Task';
import PropTypes from 'prop-types';

const TaskList = ({
	tasks,
	deleteTask,
	moveTask,
	updateTaskStatus,
	updatePriority,
}) => {
	return (
		<section className="flex flex-col gap-2">
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
	);
};

TaskList.propTypes = {
	tasks: PropTypes.array.isRequired,
	deleteTask: PropTypes.func.isRequired,
	moveTask: PropTypes.func.isRequired,
	updateTaskStatus: PropTypes.func.isRequired,
	updatePriority: PropTypes.func.isRequired,
};

export default TaskList;
