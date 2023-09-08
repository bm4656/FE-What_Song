import client from './client';
import { getCookie } from '@/constants/cookie';

export type RegisterType = {
	email: string;
	nickname: string;
	oauthId: string;
	socialType?: 'KAKAO';
};

export const loginApis = {
	// 카카오 로그인 인가코드 전송
	getLogin: async (authCode: string) => {
		const res = await client.get(`/user/kakao/callback?code=${authCode}`);
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
	postRegister: async (body: RegisterType) => {
		const res = await client.post('/user/login', { ...body });
		return res;
	},
	getUserInfo: async () => {
		// const res = await client.get('/api/v1/members/me');
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
		console.log(res);
		return res;
	},
	apiTest: async () => {
		console.log('헬스 체크');
		const res = await client.get('/api/test');
		return res;
	},
};
