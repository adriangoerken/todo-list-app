import React from 'react';
import ToDoList from '../components/organisms/ToDoList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Container from '../components/organisms/Container';
import { isMobile } from 'react-device-detect';
import { SaveStatusProvider } from '../providers/SaveStatusContextProvider';

const HomePage = () => {
	return (
		<SaveStatusProvider>
			<Container>
				<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
					<ToDoList />
				</DndProvider>
			</Container>
		</SaveStatusProvider>
	);
};

export default HomePage;
