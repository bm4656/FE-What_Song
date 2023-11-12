import client from './client';

type createType = {
	memberSeq: number;
	img_url: null;
	start: string;
	end: string;
	storyVideoReq: {
		videoId: string;
		title: string;
		channelName: string;
		thumbnailUrl: string;
	};
};

export const storyClients = {
	// 스토리 생성
	postCreateStory: async (body: createType) => {
		const res = await client.post('/api/v1/story', { ...body });
		return res;
	},
};
