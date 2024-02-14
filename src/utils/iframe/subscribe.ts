/* 소켓 subscribe */

import { CompatClient } from '@stomp/stompjs';

type playingStatusInfo = {
	timeStamp: string;
	status: 'PLAYING' | 'PAUSE';
};

// 플레이 리스트 업데이트 구독
export const playListStatusSubscribe = (roomCode: string, client: CompatClient | any, setPlayList: any) => {
	client.current.subscribe(
		`/stream/${roomCode}/playlist/current/info`,
		(data: any) => {
			const newMessage = JSON.parse(data.body);
			setPlayList(newMessage);
		},
		{}
	);
};

// 뮤직 상태 업데이트 구독
export const musicStatusSubscribe = (
	roomCode: string,
	client: CompatClient | any,
	setPlayingStatus: (status: playingStatusInfo) => void
) => {
	client.current.subscribe(
		`/stream/${roomCode}/music/current/info`,
		(data: any) => {
			const musicStatus = JSON.parse(data.body);
			setPlayingStatus(musicStatus);
		},
		{}
	);
};

// 입장 멤버 리스트 구독
export const enterSubscribe = (roomCode: string, client: CompatClient | any, setNewMemberList: any) => {
	client.current.subscribe(
		`/stream/${roomCode}/room/enter`,
		(data: any) => {
			const newMessage = JSON.parse(data.body);
			const newMemberList = newMessage.memberList;
			// TODO 참여중인 멤버 리스트 UPDATE
			setNewMemberList(newMemberList);
		},
		{}
	);
};

// 퇴장 멤버 리스트 구독
export const leaveSubscribe = (roomCode: string, client: CompatClient | any, setNewMemberList: any) => {
	client.current.subscribe(
		`/stream/${roomCode}/room/leave`,
		(data: any) => {
			const newMessage = JSON.parse(data.body);
			// TODO 참여중인 멤버 리스트 UPDATE
			const newMemberList = newMessage.memberList;
			setNewMemberList(newMemberList);
		},
		{}
	);
};
