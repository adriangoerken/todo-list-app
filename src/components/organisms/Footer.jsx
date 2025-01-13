import React from 'react';
import Container from './Container';
import { useTranslation } from 'react-i18next';
import { setCookie } from '../../utils/utils';
import Select from '../atoms/Select';
import { Link } from 'react-router-dom';

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
				<div className="flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-y-4 md:gap-y-0">
					<div className="text-center md:text-left mr-4">
						<h3 className="text-lg font-bold break-all">
							WorkingTitle
						</h3>
						<p className="break-all">
							&copy; {year}, {t('Footer.copyright')}
						</p>
					</div>
					<div className="flex flex-col md:flex-row flex-wrap gap-x-4 gap-y-2 md:gap-y-0 text-center md:text-left flex-1">
						<Link
							to="/imprint"
							className="hover:underline break-all"
						>
							{t('Footer.links.linkImprint')}
						</Link>
						<Link
							to="/privacy-policy"
							className="hover:underline break-all"
						>
							{t('Footer.links.linkPrivacy')}
						</Link>
						<Link
							to="/terms-of-service"
							className="hover:underline break-all"
						>
							{t('Footer.links.linkTerms')}
						</Link>
					</div>
					<div className="w-full md:w-auto flex justify-center md:justify-end">
						<Select
							onchange={(e) =>
								handleChangeLanguage(e.target.value)
							}
							value={i18n.language}
							options={languageOptions}
							className="min-w-[200px]"
						/>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
