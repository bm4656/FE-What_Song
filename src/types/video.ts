export type Video = {
	videoId: string;
	title: string;
	channelName: string;
	thumbnailUrl: string;
	startTime: 46;
	endTime: 60;
};

export type StoryVideo = {
	videoId: string;
	title: string;
	thumbnailUrl: string;
	startTime: number;
	endTime: number;
	channelName: string;
};

export type QueueVideo = {
	recognize: string;
	reservationId: string;
	roomSeq: number;
	selectVideo: Video;
};

export type ResVideo = Video & {
	reservationId: string;
	roomSeq?: number;
};

export type YoutubeType = Video & {
	roomSeq: number;
};
