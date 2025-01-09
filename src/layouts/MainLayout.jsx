import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { SaveStatusProvider } from '../providers/SaveStatusContextProvider';

const MainLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<SaveStatusProvider>
				<NavBar />
			</SaveStatusProvider>
			<div className="flex flex-col flex-grow">
				<Outlet />
			</div>
			<Footer />
			<ToastContainer theme="colored" />
		</div>
	);
};

export default MainLayout;
