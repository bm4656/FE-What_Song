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
	getUserRooms: async (memberSeq: number) => {
		const res = await server.get(`/api/v1/check/have?memberSeq=${memberSeq}`);
		return res.data;
	},
	getAllRooms: async () => {
		const res = await server.get('/api/v1/check/all');
		return res.data;
	},
};
