/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'Roboto', 'sans-serif'],
			},
			colors: {
				'custom-gray': '#121212',
				'elevation-100': '#1D1D1D',
				'elevation-200': '#1E1E1E',
				'elevation-300': '#1F1F1F',
			},
		},
	},
	plugins: [],
};
