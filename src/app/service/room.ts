import { QueueVideo } from '@/types/video';
import server from './server';
import { decodeTitle } from '@/utils/youtube/decode';

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
	getRoomData: async (roomId: number) => {
		const res = await server.get(`/api/v1/check/room?roomSeq=${roomId}`);
		return res.data;
	},
};
