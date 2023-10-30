import client from './client';
import { decodeTitle } from '@/utils/youtube/decode';

export const youtubeApis = {
	serchKeyword: async (body: { keyword: string }) => {
		const res = await client.post('/api/v1/youtube/search', { ...body });
		// const decoded = res.data.map((item: YoutubeType) => {
		// 	item.title = decode(item.title);
		// 	return item;
		// });
		// return decoded;
		return decodeTitle(res.data);
	},
};
