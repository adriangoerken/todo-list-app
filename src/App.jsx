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
import SettingsPage from './pages/SettingsPage';
import CookieBanner from './components/atoms/CookieBanner';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfService';
import ImprintPage from './pages/ImprintPage';
import AdminPanelPage from './pages/AdminPanelPage';
import { SaveStatusProvider } from './providers/SaveStatusContextProvider';

const RouterWrapper = () => {
	return (
		<AuthProvider>
			<SaveStatusProvider>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{/* Public routes */}
						<Route index element={<IndexPage />} />
						<Route path="/signin" element={<SignInPage />} />
						<Route path="/signup" element={<SignUpPage />} />
						<Route path="/imprint" element={<ImprintPage />} />
						<Route
							path="/privacy-policy"
							element={<PrivacyPolicyPage />}
						/>
						<Route
							path="/terms-of-service"
							element={<TermsOfServicePage />}
						/>

						{/* Private routes */}
						<Route element={<PrivateRoutes />}>
							<Route path="/home" element={<HomePage />} />
							<Route
								path="/settings"
								element={<SettingsPage />}
							/>
							<Route
								path="/admin-panel"
								element={<AdminPanelPage />}
							/>
						</Route>

						{/* 404 page */}
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</SaveStatusProvider>
		</AuthProvider>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<RouterWrapper />
			<CookieBanner />
		</BrowserRouter>
	);
};

export default App;
