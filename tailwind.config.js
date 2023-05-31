/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: '#428EEF',
				primarySub: '#E5EFFF',
				secondary: '#FE6693',
				secondarySub: '#FFA0C2',
				simple: '#D8D8D8',
				moreSimple: '#EAEAEA',
				fontGray: '#484C52',
				input: '#E8EEF3',
			},
		},
	},
	plugins: [],
};
