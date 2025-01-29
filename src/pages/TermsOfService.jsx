import React from 'react';
import Container from '../components/organisms/Container';
import { useTranslation } from 'react-i18next';
import SectionCard from '../components/molecules/SectionCard';

const TermsOfServicePage = () => {
	const [t] = useTranslation('global');
	const [street, city, country] = t(
		'TermsOfServicePage.section9.contactInfo.address'
	).split(',');

	return (
		<section>
			<Container>
				{/* Page Title */}
				<h1 className="text-3xl font-bold mb-6">
					{t('TermsOfServicePage.headerTitle')}
				</h1>

				{/* Introduction */}
				<p className="mb-6">{t('TermsOfServicePage.introText')}</p>

				{/* Sections */}
				<div className="space-y-8">
					{/* Section 1 */}
					<SectionCard title={t('TermsOfServicePage.section1.title')}>
						<p>{t('TermsOfServicePage.section1.description')}</p>
					</SectionCard>

					{/* Section 2 */}
					<SectionCard title={t('TermsOfServicePage.section2.title')}>
						<p>{t('TermsOfServicePage.section2.description')}</p>
					</SectionCard>

					{/* Section 3 */}
					<SectionCard title={t('TermsOfServicePage.section3.title')}>
						<p className="mb-4">
							{t('TermsOfServicePage.section3.description')}
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								{t(
									'TermsOfServicePage.section3List.prohibitedUse'
								)}
							</li>
							<li>
								{t(
									'TermsOfServicePage.section3List.unauthorizedAccess'
								)}
							</li>
							<li>
								{t(
									'TermsOfServicePage.section3List.inappropriateContent'
								)}
							</li>
						</ul>
					</SectionCard>

					{/* Section 4 */}
					<SectionCard title={t('TermsOfServicePage.section4.title')}>
						<p>{t('TermsOfServicePage.section4.description')}</p>
					</SectionCard>

					{/* Section 5 */}
					<SectionCard title={t('TermsOfServicePage.section5.title')}>
						<p>{t('TermsOfServicePage.section5.description')}</p>
					</SectionCard>

					{/* Section 6 */}
					<SectionCard title={t('TermsOfServicePage.section6.title')}>
						<p>{t('TermsOfServicePage.section6.description')}</p>
					</SectionCard>

					{/* Section 7 */}
					<SectionCard title={t('TermsOfServicePage.section7.title')}>
						<p>{t('TermsOfServicePage.section7.description')}</p>
					</SectionCard>

					{/* Section 8 */}
					<SectionCard title={t('TermsOfServicePage.section8.title')}>
						<p>{t('TermsOfServicePage.section8.description')}</p>
					</SectionCard>

					{/* Section 9 */}
					<SectionCard title={t('TermsOfServicePage.section9.title')}>
						<p className="mb-4">
							{t('TermsOfServicePage.section9.description')}
						</p>
						<div className="flex flex-col gap-2">
							<p>
								{t(
									'TermsOfServicePage.section9.contactInfo.companyName'
								)}
							</p>
							<p className="flex flex-col">
								<span>{street}</span>
								<span>{city}</span>
								<span>{country}</span>
							</p>
							<p>
								{t(
									'TermsOfServicePage.section9.contactInfo.email'
								)}
							</p>
							<p>
								{t(
									'TermsOfServicePage.section9.contactInfo.phone'
								)}
							</p>
						</div>
					</SectionCard>
				</div>
			</Container>
		</section>
	);
};

export default TermsOfServicePage;
