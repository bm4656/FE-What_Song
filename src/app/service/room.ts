import server from './server';

export type Room = {
	have: { musicRoomSeq: number; roomName: string; roomCode: string; category: string; accessAuth: string };
	extraInfo: {
		hostName: string;
		view: number;
	};
};

export const roomApis = {
	healthCheck: async () => {
		const res = await server.get('/api/v1/healthcheck');
		return console.log(res);
	},
	// createMusicRoom: async (body: {
	// 	memberSeq: number | undefined;
	// 	roomName: string;
	// 	category: string;
	// 	accessAuth: string;
	// }) => {
	// 	const res = await server.post('/api/v1/musicRoom', { ...body });
	// 	return res;
	// },
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
