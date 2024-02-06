import { RegisterKakaoInfo } from '@/state/store/login';
import client from './client';
import { getCookie } from '@/constants/cookie';

export const loginApis = {
	// 카카오 로그인 인가코드 전송
	getLogin: async (authCode: string) => {
		const res = await client.post('/oauth/callback', { code: authCode });
		return res;
	},
	Logout: async () => {
		const res = await client.get('/user/logout', {
			baseURL: '/server/',
			withCredentials: true,
			headers: {
				'Access-Control-Allow-Credentials': true,
				'ngrok-skip-browser-warning': '69420',
				Authorization: `Bearer ${getCookie('accessToken')}`,
				refresh: getCookie('refreshToken'),
			},
		});
		return res;
	},
	// 회원가입 데이터 전송
	postRegister: async (body: RegisterKakaoInfo) => {
		const res = await client.post('/oauth/signup', {
			...body,
		});
		return res;
	},
	getUserInfo: async () => {
		const res = await client.get('/api/v1/members/me ', {
			baseURL: '/server/',
			withCredentials: true,
			headers: {
				'Access-Control-Allow-Credentials': true,
				'ngrok-skip-browser-warning': '69420',
				Authorization: `Bearer ${getCookie('accessToken')}`,
				refreshToken: getCookie('refreshToken'),
			},
		});
		return res;
	},
};
