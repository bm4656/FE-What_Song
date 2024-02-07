/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
			{
				protocol: 'http',
				hostname: 'k.kakaocdn.net',
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
				destination: `${process.env.NEXT_PUBLIC_NGROK_URI}/:path*`, // 실제 API 엔드포인트
			},
		];
	},
};

module.exports = nextConfig;
