import client from './client';
import { decodeTitle } from '@/utils/youtube/decode';

export const youtubeApis = {
	serchKeyword: async (body: { keyword: string }) => {
		const res = await client.post('/api/v1/youtube/search', { ...body });
		return decodeTitle(res.data);
	},
};
