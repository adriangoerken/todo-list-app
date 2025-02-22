import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTAButtons = () => {
	const [t] = useTranslation('global');

	return (
		<div className="flex flex-col md:flex-row mt-10 gap-6 justify-center">
			<Link
				to="signin"
				className="border border-blue-700 hover:border-blue-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md transition-all md:w-[145px]"
			>
				{t('CTAButtons.btnSignIn')}
			</Link>
			<Link
				to="signup"
				className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md transition-all md:w-[145px]"
			>
				{t('CTAButtons.btnSignUp')}
			</Link>
		</div>
	);
};

export default CTAButtons;
