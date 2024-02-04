import axios, { InternalAxiosRequestConfig } from 'axios';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import { getCookie, removeCookie, setCookie } from '@/constants/cookie';
import { accessExpires, refreshExpires } from '@/utils/login';

const client = axios.create({
	baseURL: '/server/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		'ngrok-skip-browser-warning': '69420',
	},
});

client.interceptors.request.use((requestConfig: InternalAxiosRequestConfig) => {
	// 모든 요청 시 accessToken 인가 받기
	requestConfig.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
	return requestConfig;
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
		// 토큰이 유효하지 않을 시 그리고 oauth관련 요청이 아닐시
		if (status === 401 && !['/user/token/reissue', 'kakao', 'logout'].some((str) => config.url.includes(str))) {
			try {
				const originalRequest = config;
				// token refresh 요청
				const refreshToken = getCookie('refreshToken');
				const res = await client.get('/user/token/reissue', {
					headers: { refresh: `Bearer ${refreshToken}`, Authorization: `Bearer ${''}` },
				});
				console.log('토큰 리프레쉬', res);
				const newAccessToken = res?.headers['authorization']?.split(' ')[1];
				const newRefreshToken = res?.headers['refresh'].split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
					setCookie('accessToken', newAccessToken, {
						path: '/',
						expires: accessExpires,
					});
					setCookie('refreshToken', newRefreshToken, {
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
