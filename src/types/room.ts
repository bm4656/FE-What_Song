export type Room = {
	have: { musicRoomSeq: number; roomName: string; roomCode: string; category: string; accessAuth: string };
	extraInfo: {
		hostName: string;
		email: string;
		view: number;
	};
};
