/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("daisyui")
	],
	darkMode: ['class', '[data-theme="dark"]'],
	daisyui: {
		logs: false,
		themes: [
			{
				light: {
					"primary": "#42B883",
					"neutral": "#383938",
					"base-100": "#F4F4F5",
					"info": "#38BDF8",
					"success": "#00CA4E",
					"warning": "#FFBD44",
					"error": "#FF605C",
				},
			},
			{
				dark: {
					"primary": "#42B883",
					"neutral": "#F4F4F5",
					"base-100": "#383938",
					"info": "#38BDF8",
					"success": "#00CA4E",
					"warning": "#FFBD44",
					"error": "#FF605C",
				},
			},
		],
	}
}

