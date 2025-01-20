import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { Trans, useTranslation } from 'react-i18next';

const CookieBanner = () => {
	const [t] = useTranslation('global');

	return (
		<CookieConsent
			location="bottom"
			buttonText={t('GLOBAL.cookieBanner.btnConsent')}
			declineButtonText={t('GLOBAL.cookieBanner.btnDecline')}
			cookieName="cookieConsent"
			buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
			declineButtonStyle={{ fontSize: '13px' }}
			enableDeclineButton
			expires={365}
			setDeclineCookie={false}
		>
			<Trans i18nKey="GLOBAL.cookieBanner.text" t={t}>
				This website uses cookies to enhance the user experience.
				<a href="/privacy-policy" style={{ color: '#f5e042' }}>
					Learn more
				</a>
			</Trans>
		</CookieConsent>
	);
};

export default CookieBanner;
