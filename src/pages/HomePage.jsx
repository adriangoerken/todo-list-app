import React from 'react';
import ToDoList from '../components/ToDoList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const HomePage = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<ToDoList />
		</DndProvider>
	);
};

export default HomePage;
