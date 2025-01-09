import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import global_en from './translations/en/global.json';
import global_de from './translations/de/global.json';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
	interpolation: { encapsulation: true },
	fallbackLng: 'en',
	resources: {
		en: {
			global: global_en,
		},
		de: {
			global: global_de,
		},
	},
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<I18nextProvider i18n={i18next}>
			<App />
		</I18nextProvider>
	</StrictMode>
);
