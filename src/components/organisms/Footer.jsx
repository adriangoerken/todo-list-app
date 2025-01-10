import React from 'react';
import Container from './Container';
import { useTranslation } from 'react-i18next';
import { setCookie } from '../../utils/utils';
import Select from '../atoms/Select';

const Footer = () => {
	const year = new Date().getFullYear();
	const [t, i18n] = useTranslation('global');

	const handleChangeLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setCookie('language', lang, 365);
	};

	const languageOptions = [
		{ value: 'en', label: t('Footer.select.selectOpts.optEN') },
		{ value: 'de', label: t('Footer.select.selectOpts.optDE') },
		{ value: 'zh', label: t('Footer.select.selectOpts.optZH') },
	];

	return (
		<footer className="bg-elevation-100 text-white py-6">
			<Container>
				<div className="flex flex-col md:flex-row justify-between items-center md:space-x-4">
					<div className="mb-4 md:mb-0 text-center md:text-left">
						<h3 className="text-lg font-bold">WorkingTitle</h3>
						<p>
							&copy; {year}, {t('Footer.copyright')}
						</p>
					</div>
					{/* Legal stuff */}
					<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
						<a href="/imprint" className="hover:underline">
							{t('Footer.links.linkImprint')}
						</a>
						<a href="/privacy-policy" className="hover:underline">
							{t('Footer.links.linkPrivacy')}
						</a>
						<a href="/terms-of-service" className="hover:underline">
							{t('Footer.links.linkTerms')}
						</a>
						<a href="/cookie-policy" className="hover:underline">
							{t('Footer.links.linkCookies')}
						</a>
						<a href="/contact" className="hover:underline">
							{t('Footer.links.linkContact')}
						</a>
					</div>
					{/* Language */}
					<div className="flex justify-center space-x-4 mt-4 md:mt-0"></div>
					<Select
						onchange={(e) => handleChangeLanguage(e.target.value)}
						value={i18n.language}
						options={languageOptions}
					/>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
