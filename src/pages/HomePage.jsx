import React from 'react';
import ToDoList from '../components/ToDoList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Container from '../components/Container';
import { isMobile } from 'react-device-detect';

const HomePage = () => {
	return (
		<Container>
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				<ToDoList />
			</DndProvider>
		</Container>
	);
};

export default HomePage;
