import client from './client';

export type YoutubeType = { videoId: string; title: string; channelName: string; thumbnailUrl: string };

export const youtubeApis = {
	serchKeyword: async (body: { keyword: string }) => {
		const res = await client.post('/server/api/v1/youtube/search', { ...body });
		return res.data;
	},
};
