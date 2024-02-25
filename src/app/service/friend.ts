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
	followFriend: async (body: { ownerSeq: number; targetSeq: number }) => {
		const res = await client.post('api/v1/friends/apply', { ...body });
		return res.data;
	},
	unFollowFriend: async (body: { ownerSeq: number; targetSeq: number }) => {
		const res = await client.delete('api/v1/friends/apply', { data: { ...body } });
		return res.data;
	},
	getFollowCount: async (ownerSeq: number) => {
		const followingRes = await client.get(`/api/v1/friends/following?ownerSeq=${ownerSeq}&page=1&size=1`);
		const followerRes = await client.get(`/api/v1/friends/follower?ownerSeq=${ownerSeq}&page=1&size=1`);
		const followingCount = followingRes.data.followCount.followCount;
		const followerCount = followerRes.data.followCount.followCount;
		return { followingCount, followerCount };
	},
};
