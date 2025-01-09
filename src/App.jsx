import React from 'react';
import { AuthProvider } from './providers/AuthContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import IndexPage from './pages/IndexPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoutes from './components/organisms/PrivateRoutes';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const RouterWrapper = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					{/* PUblic routes */}
					<Route index element={<IndexPage />} />
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/signup" element={<SignUpPage />} />

					{/* Private routes */}
					<Route element={<PrivateRoutes />}>
						<Route path="/home" element={<HomePage />} />
					</Route>

					{/* 404 page */}
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<RouterWrapper />
		</BrowserRouter>
	);
};

export default App;
