import { CompatClient } from '@stomp/stompjs';
import { atom } from 'jotai';
import { MutableRefObject, useRef } from 'react';
import { YouTubePlayer } from 'react-youtube';

type MusicControllerType = {
	musicSock: MutableRefObject<CompatClient | undefined> | null;
	musicPlayer: YouTubePlayer | null;
};

type MusicRoomInfoType = {
	musicRoomId: number | string;
	musicRoomCode: string;
	isOwner: boolean;
	memberList: [];
};

export const musicController = atom<MusicControllerType>({
	musicSock: null,
	musicPlayer: null,
});

export const musicRoomInfo = atom<MusicRoomInfoType>({
	musicRoomId: '',
	musicRoomCode: '',
	isOwner: false,
	memberList: [],
});
