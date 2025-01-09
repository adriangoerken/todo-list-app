import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../providers/AuthContextProvider';
import Loader from '../atoms/Loader';

const PrivateRoutes = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return <Loader />;
	}

	return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
