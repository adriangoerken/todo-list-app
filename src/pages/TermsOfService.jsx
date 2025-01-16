import React from 'react';
import Container from '../components/organisms/Container';
import { useTranslation } from 'react-i18next';

const TermsOfServicePage = () => {
	const [t] = useTranslation('global');
	const [street, city, country] = t(
		'TermsOfServicePage.section9.contactInfo.address'
	).split(',');

	return (
		<section className="py-10">
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
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section1.title')}
						</h2>
						<p>{t('TermsOfServicePage.section1.description')}</p>
					</div>

					{/* Section 2 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section2.title')}
						</h2>
						<p>{t('TermsOfServicePage.section2.description')}</p>
					</div>

					{/* Section 3 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section3.title')}
						</h2>
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
					</div>

					{/* Section 4 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section4.title')}
						</h2>
						<p>{t('TermsOfServicePage.section4.description')}</p>
					</div>

					{/* Section 5 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section5.title')}
						</h2>
						<p>{t('TermsOfServicePage.section5.description')}</p>
					</div>

					{/* Section 6 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section6.title')}
						</h2>
						<p>{t('TermsOfServicePage.section6.description')}</p>
					</div>

					{/* Section 7 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section7.title')}
						</h2>
						<p>{t('TermsOfServicePage.section7.description')}</p>
					</div>

					{/* Section 8 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section8.title')}
						</h2>
						<p>{t('TermsOfServicePage.section8.description')}</p>
					</div>

					{/* Section 9 */}
					<div>
						<h2 className="text-xl font-semibold mb-2">
							{t('TermsOfServicePage.section9.title')}
						</h2>
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
					</div>
				</div>
			</Container>
		</section>
	);
};

export default TermsOfServicePage;
