import { QueueVideo } from '@/types/video';
import server from './server';

export const roomApis = {
	healthCheck: async () => {
		const res = await server.get('/api/v1/healthcheck');
		return console.log(res);
	},
	getUserRooms: async (memberSeq: number) => {
		const res = await server.get(`/api/v1/check/have?memberSeq=${memberSeq}`);
		return res.data;
	},
	getAllRooms: async () => {
		const res = await server.get('/api/v1/check/all');
		return res.data;
	},
	getQueueList: async (roomId: number) => {
		const res = await server.get(`/api/v1/reservation?roomSeq=${roomId}`);
		const queueList: QueueVideo[] = res.data;
		console.log(queueList);
		const filteredList = queueList.map((item: QueueVideo) => item.selectVideo);
		return filteredList;
	},
	getPlayList: async (roomId: number) => {
		const res = await server.get(`/api/v1/reservation/approve/list?roomSeq=${roomId}`);
		const playList: QueueVideo[] = res.data;
		const filteredList = playList.map((item: QueueVideo) => item.selectVideo);
		return filteredList;
	},
	getRoomData: async (roomId: number) => {
		const res = await server.get(`/api/v1/check/room?roomSeq=${roomId}`);
		return res.data;
	},
};
