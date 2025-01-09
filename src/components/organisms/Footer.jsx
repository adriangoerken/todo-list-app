import React from 'react';
import Container from './Container';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const year = new Date().getFullYear();
	const [t, i18n] = useTranslation('global');

	const handleChangeLanguage = (lang) => {
		i18n.changeLanguage(lang);
	};

	return (
		<footer className="bg-gdray-800 bg-elevation-100 text-white py-6">
			<Container>
				<div className="flex flex-col md:flex-row justify-between items-center md:space-x-4">
					<div className="mb-4 md:mb-0 text-center md:text-left">
						<h3 className="text-lg font-bold">WorkingTitle</h3>
						<p>&copy; {year}, All rights reserved.</p>
					</div>
					{/* Legal stuff */}
					<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
						<a href="/imprint" className="hover:underline">
							Imprint
						</a>
						<a href="/privacy-policy" className="hover:underline">
							Privacy Policy
						</a>
						<a href="/terms-of-service" className="hover:underline">
							Terms of Service
						</a>
						<a href="/cookie-policy" className="hover:underline">
							Cookie Policy
						</a>
						<a href="/contact" className="hover:underline">
							Contact
						</a>
					</div>
					{/* Socials */}
					<div className="flex justify-center space-x-4 mt-4 md:mt-0"></div>
					<button onClick={() => handleChangeLanguage('en')}>
						EN
					</button>
					<button onClick={() => handleChangeLanguage('de')}>
						DE
					</button>
					<button onClick={() => handleChangeLanguage('cn')}>
						CN
					</button>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
