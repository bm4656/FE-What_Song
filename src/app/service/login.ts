import { RegisterKakaoInfo } from '@/state/store/login';
import client from './client';

export const loginApis = {
	// 카카오 로그인 인가코드 전송
	getLogin: async (authCode: string) => {
		const res = await client.post('/oauth/callback', { code: authCode });
		return res;
	},
	logout: async () => {
		const res = await client.post('/oauth/logout');
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
		const res = await client.get('/oauth/me ');
		return res.data;
	},
};
