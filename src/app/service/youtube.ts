import client from './client';

export type YoutubeType = {
	videoId: string;
	title: string;
	channelName: string;
	thumbnailUrl: string;
	roomSeq: number;
};

export const youtubeApis = {
	serchKeyword: async (body: { keyword: string }) => {
		const res = await client.post('/api/v1/youtube/search', { ...body });
		// const str = /&#39;/gi;
		// return res.data.filter((item: YoutubeType) => {
		// 	item.title = item.title.replace(str, "'");
		// });
		return res.data;
	},
};
