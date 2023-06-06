/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	async rewrites() {
		return [
			{
				source: '/:path*', // 프록시를 사용할 경로
				destination: 'https://745f-39-122-156-233.ngrok-free.app/:path*', // 실제 API 엔드포인트
			},
		];
	},
};

module.exports = nextConfig;
