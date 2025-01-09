import { useState, useContext, createContext } from 'react';

const SaveStatusContext = createContext();

export const SaveStatusProvider = ({ children }) => {
	const [isSaving, setIsSaving] = useState(false);

	return (
		<SaveStatusContext.Provider value={{ isSaving, setIsSaving }}>
			{children}
		</SaveStatusContext.Provider>
	);
};

export const useSaveStatus = () => {
	const context = useContext(SaveStatusContext);
	if (context === undefined) {
		throw new Error(
			'useSaveStatus must be used within a SaveStatusProvider'
		);
	}
	return context;
};
