import axios from 'axios';
import client from './client';

export type RegisterType = {
	email: string;
	nickname: string;
	oauthId: string;
};

export const loginApis = {
	// 카카오 로그인 인가코드 전송
	getLogin: async (authCode: string) => {
		const res = await client.get(`/server/user/kakao/callback?code=${authCode}`);
		return res;
	},
	// 회원가입 데이터 전송
	postRegister: async (body: RegisterType) => {
		const res = await axios.post('/server/user/login', { ...body });
		return res;
	},
};
