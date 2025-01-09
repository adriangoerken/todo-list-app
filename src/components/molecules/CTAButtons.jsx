import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTAButtons = () => {
	const [t, i18n] = useTranslation('global');

	return (
		<div className="mt-10 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
			<Link
				to="signin"
				className="border border-blue-700 hover:border-blue-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md transition-all"
			>
				{t('CTAButtons.btnSignIn')}
			</Link>
			<Link
				to="signup"
				className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-all"
			>
				{t('CTAButtons.btnSignUp')}
			</Link>
		</div>
	);
};

export default CTAButtons;
