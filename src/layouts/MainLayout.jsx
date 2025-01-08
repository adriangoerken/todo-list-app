import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex flex-grow">
				<Outlet />
			</div>
			<ToastContainer theme="colored" />
		</div>
	);
};

export default MainLayout;
