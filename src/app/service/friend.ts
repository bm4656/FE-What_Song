import { RawUser } from '@/types/user';
import client from './client';

export const friendApis = {
	searchName: async (body: { ownerSeq: number; targetName: string }) => {
		const res = await client.post<RawUser[]>('api/v1/friends/search', { ...body });
		const filteredData = res.data.map((item) => ({
			memberSeq: item.memberSeq,
			email: item.email,
			imgURL: item.imgURL,
			nickname: item.nickname,
		}));
		return filteredData;
	},
};
