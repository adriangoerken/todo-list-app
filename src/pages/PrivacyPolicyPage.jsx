import React from 'react';
import Container from '../components/organisms/Container';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCookie } from '../utils/utils';
import { postData } from '../api/api';

const PrivacyPolicyPage = () => {
	const [t] = useTranslation('global');

	const handleRevokeConsent = async () => {
		document.cookie =
			'language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
		document.cookie =
			'cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

		const url =
			'http://localhost/projects/todo-list-app/backend/api/user/revokecookieconsent';
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
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section1.title')}
							</h2>
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
						</div>

						{/* Section 2 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section2.title')}
							</h2>
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
						</div>

						{/* Section 3 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section3.title')}
							</h2>
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
						</div>

						{/* Section 4 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section4.title')}
							</h2>
							<p>{t('PrivacyPolicyPage.section4.description')}</p>
						</div>

						{/* Section 5 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section5.title')}
							</h2>
							<p>{t('PrivacyPolicyPage.section5.description')}</p>
						</div>

						{/* Section 6 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section6.title')}
							</h2>
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
						</div>

						{/* Section 7 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section7.title')}
							</h2>
							<p>{t('PrivacyPolicyPage.section7.description')}</p>
						</div>

						{/* Section 8 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section8.title')}
							</h2>
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
						</div>

						{/* Section 9 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section9.title')}
							</h2>
							<p>{t('PrivacyPolicyPage.section9.description')}</p>
						</div>

						{/* Section 10 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section10.title')}
							</h2>
							<p>
								{t('PrivacyPolicyPage.section10.description')}
							</p>
						</div>

						{/* Section 11 */}
						<div>
							<h2 className="text-2xl font-semibold">
								{t('PrivacyPolicyPage.section11.title')}
							</h2>
							<p>
								{t('PrivacyPolicyPage.section11.description')}
							</p>
							<div className="space-y-2">
								<p>
									{t(
										'PrivacyPolicyPage.section11.contactInfo.companyName'
									)}
									: [Your Company Name]
								</p>
								<p>
									{t(
										'PrivacyPolicyPage.section11.contactInfo.address'
									)}
									: [Your Address]
								</p>
								<p>
									{t(
										'PrivacyPolicyPage.section11.contactInfo.email'
									)}
									: [Your Email Address]
								</p>
								<p>
									{t(
										'PrivacyPolicyPage.section11.contactInfo.phone'
									)}
									: [Your Phone Number]
								</p>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PrivacyPolicyPage;
