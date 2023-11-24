export type Room = {
	have: { musicRoomSeq: number; roomName: string; roomCode: string; category: string; accessAuth: string };
	extraInfo: {
		hostName: string;
		hostEmail: string;
		view: number;
	};
};

export type ListType = 'playList' | 'queueList' | 'allList';
