/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			colors: {
				blue: {
					800: "#044a8c",
				},
				gray: {
					800: "#09090A",
				},
				yellow: {
					500: "#bc960b",
				},
			},
		},
	},
	plugins: [],
};
