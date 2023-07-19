import axios from 'axios';
import { headers } from 'next/headers';
import client from './client';
import server from './server';
import { getCookie } from '@/constants/cookie';

export type RegisterType = {
	email: string;
	nickname: string;
	oauthId: string;
};

export const loginApis = {
	// 카카오 로그인 인가코드 전송
	getLogin: async (authCode: string) => {
		const res = await client.get(`/user/kakao/callback?code=${authCode}`);
		return res;
	},
	// 회원가입 데이터 전송
	postRegister: async (body: RegisterType) => {
		const res = await client.post('/user/login', { ...body });
		return res;
	},
	apiTest: async () => {
		console.log('헬스 체크');
		const res = await client.get('/api/test');
		return res;
	},
};
