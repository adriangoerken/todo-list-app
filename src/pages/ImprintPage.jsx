import React from 'react';
import Container from '../components/organisms/Container';
import { useTranslation } from 'react-i18next';

const ImprintPage = () => {
	const [t] = useTranslation('global');

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
					<ul className="list-disc list-inside space-y-2">
						<li>
							{t('ImprintPage.section1.description.companyName')}
						</li>
						<li>{t('ImprintPage.section1.description.address')}</li>
						<li>{t('ImprintPage.section1.description.email')}</li>
						<li>{t('ImprintPage.section1.description.phone')}</li>
						<li>{t('ImprintPage.section1.description.website')}</li>
					</ul>
				</div>

				{/* Section 2: Legal Representatives */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section2.title')}
					</h2>
					<p>{t('ImprintPage.section2.description')}</p>
					<p className="mt-2">
						{t('ImprintPage.section2.representatives')}
					</p>
				</div>

				{/* Section 3: Registration Information */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section3.title')}
					</h2>
					<ul className="list-disc list-inside space-y-2">
						<li>
							{t(
								'ImprintPage.section3.description.companyRegistration'
							)}
						</li>
						<li>{t('ImprintPage.section3.description.vatId')}</li>
					</ul>
				</div>

				{/* Section 4: Dispute Resolution */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section4.title')}
					</h2>
					<p>{t('ImprintPage.section4.description')}</p>
				</div>

				{/* Section 5: Disclaimer */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section5.title')}
					</h2>
					<p>{t('ImprintPage.section5.description')}</p>
				</div>

				{/* Section 6: Contact */}
				<div className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">
						{t('ImprintPage.section6.title')}
					</h2>
					<p>{t('ImprintPage.section6.description')}</p>
					<ul className="list-disc list-inside space-y-2 mt-2">
						<li>{t('ImprintPage.section6.contactInfo.email')}</li>
						<li>{t('ImprintPage.section6.contactInfo.phone')}</li>
					</ul>
				</div>
			</Container>
		</section>
	);
};

export default ImprintPage;
