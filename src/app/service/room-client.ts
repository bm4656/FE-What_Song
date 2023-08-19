import client from './client';

type Queue = {
	recognize: string;
	reservationId: string;
	roomSeq: number;
	selectVideo: {
		videoId: string;
		title: string;
		channelName: string;
		thumbnailUrl: string;
	};
};

export const roomClients = {
	createMusicRoom: async (body: {
		memberSeq: number | undefined;
		roomName: string;
		category: string;
		accessAuth: string;
	}) => {
		const res = await client.post('/api/v1/musicRoom', { ...body });
		return res;
	},
	getAllRooms: async () => {
		const res = await client.get('/api/v1/check/all');
		return res.data;
	},
	getUserRooms: async (userId: string) => {
		const res = await client.get(`/api/v1/check/have?memberSeq=${userId}`);
		return res.data;
	},
	deleteRoom: async (roomId: number) => {
		const res = await client.delete('/api/v1/musicRoom', { data: { roomSeq: roomId } });
		return res;
	},
	registerMusic: async (body: {
		videoId: string;
		title: string;
		channelName: string;
		thumbnailUrl: string;
		roomSeq: number;
	}) => {
		const res = await client.post('/api/v1/reservation', { ...body });
		return res;
	},
	getQueueList: async (roomId: number) => {
		const res = await client.get(`/api/v1/reservation?roomSeq=${roomId}`);
		const queueList: Queue[] = res.data;
		const filteredList = queueList.map((item: Queue) => item.selectVideo);
		return filteredList;
	},
	getRoomData: async (roomId: number) => {
		const res = await client.get(`/api/v1/check/room?roomSeq=${roomId}`);
		return res.data;
	},
};
