import React, { useContext, useState, useEffect, createContext } from 'react';
import { deleteData, postData } from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/atoms/Loader';
import { useTranslation } from 'react-i18next';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [t, i18n] = useTranslation('global');

	useEffect(() => {
		checkUserStatus();
	}, []);

	const signUp = async (newUser) => {
		const url =
			'http://localhost/projects/todo-list-app/backend/api/user/signup';
		setLoading(true);

		const response = await postData(url, newUser);

		if (response.success) {
			setLoading(false);
			toast.success(t('AuthContextProvider.signUpSuccess'));
			navigate('/signin');
		} else {
			setLoading(false);
			setTimeout(() => {
				toast.error(response.error || t('GLOBAL.errDefault'));
			}, 1);
		}
	};

	const signIn = async ({ userInput }) => {
		const url =
			'http://localhost/projects/todo-list-app/backend/api/user/signin';
		setLoading(true);

		const response = await postData(url, userInput);

		if (response.success) {
			setUser(response.data.userInfo);
			setLoading(false);
		} else {
			setUser(null);
			setLoading(false);
			setTimeout(() => {
				toast.error(response.error || t('GLOBAL.errDefault'));
			}, 1);
		}
	};

	const signOut = async () => {
		const url =
			'http://localhost/projects/todo-list-app/backend/api/user/signout';
		setLoading(true);
		const response = await deleteData(url, { action: 'signout' });

		if (response.success) {
			setTimeout(() => {
				toast.success(t('AuthContextProvider.signOutSuccess'));
			}, 1);
			setUser(null);
			setLoading(false);
		} else {
			setLoading(false);

			if (response.errorType !== 'invalid_refresh_token') {
				setTimeout(() => {
					toast.error(response.error || t('GLOBAL.errDefault'));
				}, 1);
			}
		}
	};

	const checkUserStatus = async () => {
		setLoading(true);
		const url =
			'http://localhost/projects/todo-list-app/backend/api/user/signinstate';
		const response = await postData(url);

		if (response.success) {
			setUser(response.data.userInfo);
			setLoading(false);
		} else {
			setUser(null);
			setLoading(false);

			if (response.errorType !== 'invalid_refresh_token') {
				setTimeout(() => {
					toast.error(response.error || t('GLOBAL.errDefault'));
				}, 1);
			}
		}
	};

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
