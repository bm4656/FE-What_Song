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
				destination: 'https://bba5-106-101-130-147.ngrok-free.app/:path*', // 실제 API 엔드포인트
			},
		];
	},
};

module.exports = nextConfig;
