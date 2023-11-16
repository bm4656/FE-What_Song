import { QueueVideo, ResVideo } from '@/types/video';
import client from './client';
import { decodeTitle } from '@/utils/youtube/decode';

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
		memberSeq?: number;
	}) => {
		const res = await client.post('/api/v1/reservation', { ...body });
		console.log('dk', res);
		return res;
	},
	acceptRequestMusic: async (reservationId: string) => {
		const res = await client.post('/api/v1/reservation/approve', { reservationId, recognize: 'APPROVE' });
		return res;
	},
	getQueueList: async (roomId: number) => {
		const res = await client.get(`/api/v1/reservation?roomSeq=${roomId}`);
		const queueList: QueueVideo[] = res.data;
		const filteredList = queueList
			.filter((item) => item.recognize === 'NONE')
			.map((item) => {
				return {
					...item.selectVideo,
					reservationId: item.reservationId,
					recognize: item.recognize,
				};
			});
		return decodeTitle(filteredList);
	},
	getPlayList: async (roomId: number) => {
		const res = await client.get(`/api/v1/reservation/approve/list?roomSeq=${roomId}`);
		const playList: QueueVideo[] = res.data;
		const filteredList: ResVideo[] = playList
			.filter((item) => item.recognize === 'APPROVE')
			.map((item) => {
				return {
					...item.selectVideo,
					reservationId: item.reservationId,
				};
			});
		return decodeTitle(filteredList);
	},
	getRoomData: async (roomId: number) => {
		const res = await client.get(`/api/v1/check/room?roomSeq=${roomId}`);
		return res.data;
	},
};
