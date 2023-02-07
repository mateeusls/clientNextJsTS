/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa");

const settings = {
	env: {},
	devIndicators: {
		autoPrerender: false,
	},
	runtimeCaching,
	pwa: {
		dest: "public",
		buildExcludes: [/middleware-manifest.json$/],
	},
	images: {
		domains: ["github.com"],
	},
	reactStrictMode: true,
};

const nextConfig = withPWA({
	settings,
});

module.exports = process.env.NODE_ENV === "development" ? settings : nextConfig;
