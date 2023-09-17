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
				source: '/server/:path*', // 프록시를 사용할 경로
				destination: 'https://5a5f-2001-2d8-e2b4-1ed2-4d56-cee3-97d-d6a9.ngrok-free.app/:path*', // 실제 API 엔드포인트
			},
		];
	},
};

module.exports = nextConfig;
