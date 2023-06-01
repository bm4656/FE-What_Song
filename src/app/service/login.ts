import client from './client';

export const loginApis = {
	// 카카오 로그인 인가코드 전송
	getLogin: async (authCode: string) => {
		const res = await client.post('/', { authCode });
		return res;
	},
	getRegister: async (body: any) => {
		const res = await client.post('/', { ...body });
		return res;
	},
};
