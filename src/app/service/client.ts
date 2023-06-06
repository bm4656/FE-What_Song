import { UseMutateFunction } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { getCookie, removeCookie, setCookie } from '@/constants/cookie';
import { SERVICE_URL } from '@/constants/ServiceUrl';

export type MutateTpye<T> = UseMutateFunction<AxiosResponse<any, any>, unknown, T, unknown>;

const client = axios.create({
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		'ngrok-skip-browser-warning': true,
		Authorization: `Bearer ${getCookie('accessToken')}`,
	},
});

client.interceptors.response.use(
	(res) => {
		return res;
	},
	async (error) => {
		const {
			config,
			response: { status },
		} = error;

		if (status === 401 && !config.url.includes('oauth')) {
			try {
				const originalRequest = config;
				// token refresh 요청
				const refreshToken = getCookie('refreshToken');
				const res = await client.get('/oauth/token/refresh', { headers: { refresh: refreshToken } });
				const newAccessToken = res?.headers['accessToken']?.split(' ')[1];
				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

					const accessExpires = new Date();
					accessExpires.setDate(Date.now() + 1000 * 60 * 60 * 24); // 1일로 설정
					const refreshExpires = new Date();
					refreshExpires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7일로 설정
					setCookie('accessToken', 'accessTokenValue', {
						path: '/',
						expires: accessExpires,
					});
					setCookie('refreshToken', 'refreshTokenValue', {
						path: '/',
						expires: refreshExpires,
					});
				}
				return client(originalRequest);
			} catch (refreshError) {
				removeCookie('accessToken');
				removeCookie('refreshToken');
				window.location.href = SERVICE_URL.login;
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default client;
