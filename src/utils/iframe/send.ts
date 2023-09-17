/* 소켓 send */

import { CompatClient } from '@stomp/stompjs';
import { SOCKET_HEADER } from '.';

// 입장시 호출 send
export const enterSend = (roomCode: string, client: CompatClient | any) => {
	console.log('나는 입장');
	client.current.send(`/app/${roomCode}/room/enter`, SOCKET_HEADER, JSON.stringify({}));
};

// 퇴장시 호출 send
export const leaveSend = (roomCode: string, client: CompatClient | any) => {
	client.current.send(`/app/${roomCode}/room/leave`, SOCKET_HEADER, JSON.stringify({}));
};

// 방장 뮤직 상태 업데이트 send
export const musicStatusUpdate = (
	roomCode: string,
	client: CompatClient | any,
	videoId: string,
	status: string,
	timeStamp: number,
	username: string | null = null
) => {
	client.current.send(
		`/app/${roomCode}/music/current/new`,
		SOCKET_HEADER,
		JSON.stringify({
			videoId,
			status,
			timeStamp,
			username,
		})
	);
};

// 플레이 리스트  상태 확인
export const playlistStatusSend = (roomCode: string, roomId: string, client: CompatClient | any) => {
	client.current.send(
		`/app/${roomCode}/playlist/current/new`,
		SOCKET_HEADER,
		JSON.stringify({
			roomSeq: roomId,
		})
	);
};
