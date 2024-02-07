import axios, { InternalAxiosRequestConfig } from 'axios';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import { getCookie, removeCookie, setCookie } from '@/constants/cookie';

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
		if (status === 401 && !['/oauth/reissue', 'kakao', 'logout'].some((str) => config.url.includes(str))) {
			try {
				const originalRequest = config;
				// token refresh 요청
				const refreshToken = getCookie('refreshToken');
				const res = await client.get('/oauth/reissue', {
					headers: { Authorization_Refresh: `${refreshToken}` },
				});
				console.log('토큰이 만료되어 재발급 받았습니다.', res);
				// 리프레쉬 토큰 기간(2달) 1달 이하일 시 리프레쉬 토큰 재발급, 아닐 시 엑세스 토큰만 재발급
				const newAccessToken = res.data.access_token;
				const newRefreshToken = res.data.refresh_token;
				const accessExpires = new Date(Date.now() + 1000 * res.data.expires_in);
				const refreshExpires = new Date(Date.now() + 1000 * res.data.refresh_token_expires_in);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
				setCookie('accessToken', newAccessToken, {
					path: '/',
					expires: accessExpires,
				});
				if (newRefreshToken != null) {
					setCookie('refreshToken', newRefreshToken, {
						path: '/',
						expires: refreshExpires,
					});
				}
				return client(originalRequest);
			} catch (refreshError) {
				removeCookie('accessToken', { path: '/' });
				removeCookie('refreshToken', { path: '/' });
				window.location.href = SERVICE_URL.login;
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default client;
