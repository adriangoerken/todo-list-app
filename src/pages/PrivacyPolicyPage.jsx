import React from 'react';
import Container from '../components/organisms/Container';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCookie } from '../utils/utils';
import { postData } from '../api/api';
import SectionCard from '../components/molecules/SectionCard';

const PrivacyPolicyPage = () => {
	const [t] = useTranslation('global');
	const [street, city, country] = t(
		'PrivacyPolicyPage.section11.contactInfo.address'
	).split(',');

	const handleRevokeConsent = async () => {
		document.cookie =
			'language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
		document.cookie =
			'cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

		const url =
			'https://api.adriangoerken.de/taskdoneify//api/user/revokecookieconsent';
		const response = await postData(url);

		if (response.success) {
			toast.success('Cookie consent revoked successfully!');
		}
	};

	return (
		<section>
			<Container className="space-y-8">
				<h1 className="text-3xl font-bold text-center">
					{t('PrivacyPolicyPage.headerTitle')}
				</h1>
				<div className="flex flex-col gap-4 mx-auto">
					<p>{t('PrivacyPolicyPage.introText')}</p>

					<div className="space-y-6">
						{/* Section 1 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section1.title')}
						>
							<p>{t('PrivacyPolicyPage.section1.description')}</p>
							<ul className="list-disc pl-6">
								<li>
									{t(
										'PrivacyPolicyPage.section1.list.emailPassword'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section1.list.todoList'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section1.list.cookies'
									)}
								</li>
							</ul>
						</SectionCard>

						{/* Section 2 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section2.title')}
						>
							<p>{t('PrivacyPolicyPage.section2.description')}</p>
							<ul className="list-disc pl-6">
								<li>
									{t(
										'PrivacyPolicyPage.section2.list.accountManagement'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section2.list.todoListStorage'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section2.list.languagePreferences'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section2.list.sessionManagement'
									)}
								</li>
							</ul>
						</SectionCard>

						{/* Section 3 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section3.title')}
						>
							<p>{t('PrivacyPolicyPage.section3.description')}</p>
							<ul className="list-disc pl-6">
								<li>
									{t(
										'PrivacyPolicyPage.section3.list.consent'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section3.list.contractualNecessity'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section3.list.legitimateInterest'
									)}
								</li>
							</ul>
						</SectionCard>

						{/* Section 4 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section4.title')}
						>
							<p>{t('PrivacyPolicyPage.section4.description')}</p>
						</SectionCard>

						{/* Section 5 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section5.title')}
						>
							<p>{t('PrivacyPolicyPage.section5.description')}</p>
						</SectionCard>

						{/* Section 6 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section6.title')}
						>
							<p>{t('PrivacyPolicyPage.section6.description')}</p>
							<ul className="list-disc pl-6">
								<li>
									{t(
										'PrivacyPolicyPage.section6.list.rightOfAccess'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section6.list.rightToRectification'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section6.list.rightToErasure'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section6.list.rightToRestriction'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section6.list.rightToPortability'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section6.list.rightToWithdrawConsent'
									)}
								</li>
							</ul>
						</SectionCard>

						{/* Section 7 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section7.title')}
						>
							<p>{t('PrivacyPolicyPage.section7.description')}</p>
						</SectionCard>

						{/* Section 8 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section8.title')}
						>
							<p>{t('PrivacyPolicyPage.section8.description')}</p>
							<ul className="list-disc pl-6">
								<li>
									{t(
										'PrivacyPolicyPage.section8.list.languagePreferences'
									)}
								</li>
								<li>
									{t(
										'PrivacyPolicyPage.section8.list.sessionManagement'
									)}
								</li>
							</ul>
							<p className="italic">
								{t('PrivacyPolicyPage.section8.note')}
							</p>
							<button
								onClick={handleRevokeConsent}
								className="text-white hover:underline mt-2 font-bold"
							>
								{t('PrivacyPolicyPage.section8.button')}
							</button>
						</SectionCard>

						{/* Section 9 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section9.title')}
						>
							<p>{t('PrivacyPolicyPage.section9.description')}</p>
						</SectionCard>

						{/* Section 10 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section10.title')}
						>
							<p>
								{t('PrivacyPolicyPage.section10.description')}
							</p>
						</SectionCard>

						{/* Section 11 */}
						<SectionCard
							title={t('PrivacyPolicyPage.section11.title')}
						>
							<p>
								{t('PrivacyPolicyPage.section11.description')}
							</p>
							<div className="flex flex-col gap-2 mt-2">
								<p>
									{t(
										'PrivacyPolicyPage.section11.contactInfo.companyName'
									)}
								</p>
								<p className="flex flex-col">
									<span>{street}</span>
									<span>{city}</span>
									<span>{country}</span>
								</p>
								<p>
									{t(
										'PrivacyPolicyPage.section11.contactInfo.email'
									)}
								</p>
								<p>
									{t(
										'PrivacyPolicyPage.section11.contactInfo.phone'
									)}
								</p>
							</div>
						</SectionCard>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PrivacyPolicyPage;
