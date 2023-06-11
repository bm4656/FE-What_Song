import axios from 'axios';
import { cookies } from 'next/headers';
import { SERVICE_URL } from '@/constants/ServiceUrl';

const server = axios.create({
	baseURL: 'https://c0d8-114-205-30-236.ngrok-free.app/',
	withCredentials: true,
});

server.interceptors.request.use((config) => {
	const accessToken = cookies().get('accessToken')?.value;
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

server.interceptors.response.use(
	(res) => {
		return res;
	},
	async (error) => {
		const {
			config,
			response: { status },
		} = error;
		// 토큰이 유효하지 않을 시 그리고 ouath관련 요청이 아닐시
		if (status === 401) {
			try {
				const originalRequest = config;
				// token refresh 요청
				const refreshToken = cookies().get('refreshToken')?.value;
				const res = await server.get('/server/user/token/reissue', { headers: { refresh: refreshToken } });
				const newAccessToken = res?.headers['authorization']?.split(' ')[1];
				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					server.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
					document.cookie = `accessToken=${newAccessToken}; Path=/; HttpOnly`;
					document.cookie = `refreshToken=${newRefreshToken}; Path=/; HttpOnly`;
				}
				return server(originalRequest);
			} catch (refreshError) {
				window.location.href = SERVICE_URL.login;
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default server;
