import { atom } from 'jotai';

type StoriesInfoType = {
	[x: string]: any;
	memberName: string;
	stories: {
		start: string;
		end: string;
		postTime: [];
		id: string;
		img_url: null;
		storyVideo: {
			channelName: string;
			thumbnailUrl: string;
			title: string;
			videoId: string;
		};
	}[];
};

export const storiesInfo = atom<StoriesInfoType>({
	memberName: '',
	stories: [
		{
			start: '',
			end: '',
			postTime: [],
			id: '',
			img_url: null,
			storyVideo: {
				channelName: '',
				thumbnailUrl: '',
				title: '',
				videoId: '',
			},
		},
	],
});
