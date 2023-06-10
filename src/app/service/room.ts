import client from './client';

export const roomApis = {
	healthCheck: async () => {
		const res = await client.get('/server/api/v1/healthcheck');
		return console.log(res);
	},
	createMusicRoom: async (body: {
		memberSeq: number | undefined;
		roomName: string;
		category: string;
		accessAuth: string;
	}) => {
		const res = await client.post('/server/api/v1/musicRoom', { ...body });
		return res;
	},
};
