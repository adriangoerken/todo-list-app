import React, { useContext, useState, useEffect, createContext } from 'react';
import { deleteData, postData } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false); // TODO: Change to true
	const [user, setUser] = useState(null);

	useEffect(() => {
		checkUserStatus();
	}, []);

	const signUp = async (newUser) => {};

	const signIn = async ({ userInput }) => {};

	const signOut = async () => {};

	const checkUserStatus = async () => {};

	const contextData = {
		user,
		setUser,
		signIn,
		signOut,
		signUp,
		loading,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? <Loader /> : children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
