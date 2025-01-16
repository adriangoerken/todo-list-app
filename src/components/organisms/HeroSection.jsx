import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const HeroSection = () => {
	const [t] = useTranslation('global');

	return (
		<section className="flex flex-col flex-grow self-center max-w-screen-md mx-auto text-center px-4">
			<h1 className="text-4xl md:text-5xl font-bold mb-6">
				<Trans i18nKey={'HeroSection.heading'} t={t}>
					Welcome to
					<br />
					<span className="text-blue-700">TaskDoneify</span>!
				</Trans>
			</h1>
			<p className="text-lg md:text-xl mb-8">
				{t('HeroSection.subHeading')}
			</p>
		</section>
	);
};

export default HeroSection;
