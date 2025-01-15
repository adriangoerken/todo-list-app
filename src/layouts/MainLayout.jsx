import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/organisms/Footer';
import NavBar from '../components/organisms/NavBar';
import { SaveStatusProvider } from '../providers/SaveStatusContextProvider';

const MainLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="flex flex-col flex-grow">
				<Outlet />
			</div>
			<Footer />
			<ToastContainer theme="colored" />
		</div>
	);
};

export default MainLayout;
