import React from 'react';
import Container from '../components/organisms/Container';
import { useTranslation } from 'react-i18next';

const ImprintPage = () => {
	const [t] = useTranslation('global');
	const [street, city, country] = t(
		'ImprintPage.section1.description.address'
	).split(',');

	return (
		<section>
			<Container>
				<h1 className="text-3xl font-bold mb-6">
					{t('ImprintPage.headerTitle')}
				</h1>
				<p className="mb-4">{t('ImprintPage.introText')}</p>

				{/* Section 1: Provider */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section1.title')}
					</h2>
					<div className="flex flex-col gap-2">
						<span>
							{t('ImprintPage.section1.description.companyName')}
						</span>
						<p className="flex flex-col">
							<span>{street}</span>
							<span>{city}</span>
							<span>{country}</span>
						</p>
						<span>
							{t('ImprintPage.section1.description.email')}
						</span>
						<span>
							{t('ImprintPage.section1.description.phone')}
						</span>
						<span>
							{t('ImprintPage.section1.description.website')}
						</span>
					</div>
				</div>

				{/* Section 2: Disclaimer */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section2.title')}
					</h2>
					<p>{t('ImprintPage.section2.description')}</p>
				</div>

				{/* Section 3: Contact */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section3.title')}
					</h2>
					<p>{t('ImprintPage.section3.description')}</p>
					<div className="flex flex-col mt-2">
						<span>
							{t('ImprintPage.section3.contactInfo.email')}
						</span>
						<span>
							{t('ImprintPage.section3.contactInfo.phone')}
						</span>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default ImprintPage;
