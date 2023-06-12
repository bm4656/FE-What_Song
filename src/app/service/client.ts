import { UseMutateFunction } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { getCookie, removeCookie, setCookie } from '@/constants/cookie';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import { accessExpires, refreshExpires } from '@/utils/login';

export type MutateTpye<T> = UseMutateFunction<AxiosResponse<any, any>, unknown, T, unknown>;

const client = axios.create({
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		'ngrok-skip-browser-warning': true,
		Authorization: `Bearer ${getCookie('accessToken')}`,
	},
});

// client.interceptors.response.use(
// 	(res) => {
// 		return res;
// 	},
// 	async (error) => {
// 		const {
// 			config,
// 			response: { status },
// 		} = error;
// 		// 토큰이 유효하지 않을 시 그리고 ouath관련 요청이 아닐시
// 		if (status === 401) {
// 			try {
// 				const originalRequest = config;
// 				// token refresh 요청
// 				const refreshToken = getCookie('refreshToken');
// 				const res = await client.get('/server/user/token/reissue', { headers: { refresh: refreshToken } });
// 				const newAccessToken = res?.headers['authorization']?.split(' ')[1];
// 				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
// 				if (newAccessToken && newRefreshToken) {
// 					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
// 					client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
// 					setCookie('accessToken', 'accessToken', {
// 						path: '/',
// 						expires: accessExpires,
// 					});
// 					setCookie('refreshToken', 'refreshToken', {
// 						path: '/',
// 						expires: refreshExpires,
// 					});
// 				}
// 				return client(originalRequest);
// 			} catch (refreshError) {
// 				removeCookie('accessToken');
// 				removeCookie('refreshToken');
// 				window.location.href = SERVICE_URL.login;
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default client;
