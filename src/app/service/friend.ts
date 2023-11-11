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
			alreadyFollowing: item.alreadyFollowing,
		}));
		return filteredData;
	},
	addFriend: async (body: { ownerSeq: number; targetSeq: number }) => {
		const res = await client.post('api/v1/friends/apply', { ...body });
		return res.data;
	},
	getFollowings: async (ownerSeq: number) => {
		const res = await client.get(`api/v1/friends?ownerSeq=${ownerSeq}`);
		return res.data;
	},
};
