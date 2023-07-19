import { SERVICE_URL } from '@/constants/ServiceUrl';
import { getCookie, removeCookie, setCookie } from '@/constants/cookie';
import { accessExpires, refreshExpires } from '@/utils/login';
import axios from 'axios';

const isServer = typeof window === 'undefined';
const server = axios.create({
	baseURL: '/server/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		'ngrok-skip-browser-warning': '69420',
		Authorization: `Bearer ${getCookie('accessToken')}`,
	},
});

server.interceptors.request.use(async (config) => {
	if (isServer) {
		const { cookies } = await import('next/headers'),
			token = cookies().get('accessToken')?.value;
		if (token) {
			console.log(token, '서버');
			config.headers.Authorization = `Bearer ${token}`;
		}
	} else {
		const { getCookie } = await import('@/constants/cookie'),
			token = getCookie('accessToken');
		if (token) {
			console.log(token);
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
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
		if (status === 401 && !['/user/token/reissue', 'kakao'].some((str) => config.url.includes(str))) {
			try {
				const originalRequest = config;
				// token refresh 요청
				const refreshToken = getCookie('refreshToken');
				const res = await server.get('/user/token/reissue', {
					headers: { refresh: refreshToken, Authorization: `Bearer ${''}` },
				});
				const newAccessToken = res?.headers['authorization']?.split(' ')[1];
				const newRefreshToken = res?.headers['refresh'];
				if (newAccessToken && newRefreshToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					server.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
					setCookie('accessToken', newAccessToken, {
						path: '/',
						expires: accessExpires,
					});
					setCookie('refreshToken', newRefreshToken, {
						path: '/',
						expires: refreshExpires,
					});
				}
				return server(originalRequest);
			} catch (refreshError) {
				console.log(refreshError);
				removeCookie('accessToken');
				removeCookie('refreshToken');
				window.location.href = SERVICE_URL.login;
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

// server.interceptors.response.use(
// 	(res) => {
// 		return res;
// 	},
// 	async (error) => {
// 		const {
// 			config,
// 			response: { status },
// 		} = error;
// 		// 토큰이 유효하지 않을 시
// 		if (status === 401 && !config.url.includes('token')) {
// 			try {
// 				const originalRequest = config;
// 				// token refresh 요청
// 				let refreshToken;
// 				if (isServer) {
// 					const { cookies } = await import('next/headers');
// 					refreshToken = cookies().get('refreshToken')?.value;
// 				} else {
// 					const { getCookie } = await import('@/constants/cookie');
// 					refreshToken = getCookie('refreshToken');
// 				}
// 				const res = await server.get('/user/token/reissue', {
// 					headers: { refresh: refreshToken },
// 				});
// 				const newAccessToken = res?.headers['authorization']?.split(' ')[1];
// 				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
// 				if (newAccessToken && newRefreshToken) {
// 					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
// 					server.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
// 					if (isServer) {
// 						console.log('서버에서 토큰 저장');
// 					} else {
// 						console.log('클라에서 토큰 저장');
// 						document.cookie = `accessToken=${newAccessToken}; Path=/; HttpOnly`;
// 						document.cookie = `refreshToken=${newRefreshToken}; Path=/; HttpOnly`;
// 					}
// 				}
// 				return server(originalRequest);
// 			} catch (refreshError) {
// 				window.location.href = SERVICE_URL.login;
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default server;
