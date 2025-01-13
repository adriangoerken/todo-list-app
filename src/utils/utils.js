export const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

export const setCookie = (name, value, days) => {
	const cookieConsent = getCookie('cookieConsent');
	if (cookieConsent) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = `; expires=${date.toUTCString()}`;
		document.cookie = `${name}=${value || ''}${expires}; path=/`;
	}
};

export const initLanguage = () => {
	const cookieLang = getCookie('language');
	if (cookieLang) {
		return cookieLang;
	} else {
		const browserLang = navigator.language || navigator.userLanguage;
		setCookie('language', browserLang, 365); // Set cookie for 1 year
		return browserLang;
	}
};

export const validateEmail = (email) => {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(email);
};

export const validatePassword = (password) => {
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,128}$/;
	return passwordRegex.test(password);
};
