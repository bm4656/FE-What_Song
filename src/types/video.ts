export type Video = {
	videoId: string;
	title: string;
	channelName: string;
	thumbnailUrl: string;
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
