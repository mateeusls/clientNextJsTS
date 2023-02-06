/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const settings = {
	env: {},
	devIndicators: {
		autoPrerender: false,
	},
	pwa: {
		dest: "public",
	},
	images: {
		domains: ["github.com"],
	},
};

module.exports =
	process.env.NODE_ENV === "development" ? settings : withPWA(settings);
