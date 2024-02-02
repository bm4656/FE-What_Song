import { Room } from '@/types/room';
import server from './server';

export const roomApis = {
	healthCheck: async () => {
		const res = await server.get('/api/v1/healthcheck');
		return console.log(res);
	},
	getRoomData: async (roomId: number): Promise<Room> => {
		const res = await server.get(`/api/v1/check/room?roomSeq=${roomId}`);
		return res.data;
	},
};
