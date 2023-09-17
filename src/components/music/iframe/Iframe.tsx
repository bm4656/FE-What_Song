'use client';

import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { opts } from '@/constants/iframe';
import { SOCKET_HEADER, currentMusicInfo } from '@/utils/iframe';
import {
	enterSubscribe,
	leaveSubscribe,
	musicStatusSubscribe,
	playListStatusSubscribe,
} from '@/utils/iframe/subscribe';
import { enterSend, leaveSend, musicStatusUpdate, playlistStatusSend } from '@/utils/iframe/send';
import MusicRecord from '../streaming/MusicRecord';
import useUser from '@/hooks/useUser';
import StreamingBar from '@/components/bar/StreamingBar';

type Props = {
	roomId: string;
	roomCode: string;
	hostEmail: boolean;
	musicRoomSeq: number;
};

export default function Iframe({ roomId, roomCode, hostEmail, musicRoomSeq }: Props) {
	const [playList, setPlayList] = useState<any>([]);
	const [playing, setPlaying] = useState('');
	const [player, setPlayer] = useState<YouTubePlayer | null>(null);
	// const [playTimeRecord, setPlayTimeRecord] = useState<number>(0);
	const [playTime, setPlayTime] = useState<string>('0:00');
	const [playStatus, setPlayStatus] = useState<string>('NONE');
	const [progress, setProgress] = useState<number>(0);
	const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>(undefined);
	const [memberList, setMemberList] = useState<[]>([]);
	const [newMemberList, setNewMemberList] = useState<[]>([]);
	const client = useRef<CompatClient>();
	const user = useUser();
	const userEmail = user.data?.email;
	const isOwner = userEmail === hostEmail;

	const wsConnectSubscribe = () => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`${process.env.NEXT_PUBLIC_NGROK_URI}/ws-stomp`);
			return sock;
		});
		try {
			client.current.connect(SOCKET_HEADER, () => {
				// 플레이 리스트 업데이트 구독
				playListStatusSubscribe(roomCode, client, setPlayList);
				// 뮤직 상태 업데이트 구독
				musicStatusSubscribe(roomCode, client, player);
				// 입장 멤버 리스트 구독
				enterSubscribe(roomCode, client, setNewMemberList);
				// 퇴장 멤버 리스트 구독
				leaveSubscribe(roomCode, client, memberList, setMemberList);
				// 입장
				enterSend(roomCode, client);
				playlistStatusSend(roomCode, roomId, client);
			});
		} catch (e: unknown) {
			// TODO 에러 핸들링
			alert(`소켓 연결 에러${e}`);
		}
	};

	// 뮤직 프로그레시브 실시간 업데이트
	const updateProgressBar = () => {
		const { progressState, currentPlayTime } = currentMusicInfo(player);
		setProgress(progressState);
		setPlayTime(currentPlayTime);
	};

	// 뮤직 프로그레시브 점프
	const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const jump = Number(event.target.value);
		const { currentPlayTime } = currentMusicInfo(player, jump);
		setProgress(jump);
		setPlayTime(currentPlayTime);
	};

	// 뮤직 점프
	const handleMouseUp = () => {
		const duration = player.getDuration();
		const seekTime = (duration * progress) / 100;
		// TODO 점프 후 서버에게 시간 데이터 보내기
		musicStatusUpdate(roomCode, client, playing, playStatus, seekTime);
		player.seekTo(seekTime);
	};

	// 현재 재생 노래 변경
	const musicChange = (music: string) => {
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlaying(music);
	};

	// iframe 재생 준비 완료
	const onReady = (event: YouTubePlayer) => {
		setPlayer(event.target);
		wsConnectSubscribe();
	};

	// iframe 재생 시
	const onPlay = () => {
		if (intervalId === undefined) {
			const { currentTime } = currentMusicInfo(player);
			// 재생 시 뮤직 상태 send PLAYING
			if (isOwner) {
				musicStatusUpdate(roomCode, client, playing, 'PLAYING', currentTime);
			}
			const newIntervalId = setInterval(updateProgressBar, 1000);
			setIntervalId(newIntervalId);
			setPlayStatus('PLAYING');
		}
	};

	// iframe 정지 시
	const onPause = () => {
		const { currentTime } = currentMusicInfo(player);
		// 정지 시 뮤직 상태 send PAUSE 방장만
		if (isOwner) {
			musicStatusUpdate(roomCode, client, playing, 'PAUSE', currentTime);
		}
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlayStatus('PAUSE');
	};

	// iframe 노래 끝났을 때
	const onEnd = () => {
		let nextIndex = playList.findIndex((item: string) => item === playing) + 1;
		if (playList.length === nextIndex) nextIndex = 0;
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlaying(playList[nextIndex]);
	};

	useEffect(() => {
		if (player) {
			// 소켓 연결 및 구독
			wsConnectSubscribe();
		}
		return () => {
			clearInterval(intervalId);
			// 퇴장
			// eslint-disable-next-line
			player && leaveSend(roomCode, client);
			client.current!.disconnect();
		};
	}, [player]);

	// 이전 멤버와 새로운 멤버 비교, 새 맴버 있으면 시간 업데이트
	useEffect(() => {
		if (memberList?.length < newMemberList?.length) {
			if (isOwner && player) {
				const { currentTime } = currentMusicInfo(player);
				musicStatusUpdate(roomCode, client, playing, playStatus, currentTime);
			}
		}
		setMemberList(newMemberList);
	}, [newMemberList]);

	return (
		<>
			<MusicRecord
				image={playList[0]?.selectVideo.thumbnailUrl}
				isHost={isOwner}
				playStatus={playStatus}
				player={player}
			/>
			<div className="flex flex-col justify-center items-center p-2 w-full">
				<h2 className="text-4xl font-bold">{playList[0]?.selectVideo.title}</h2>
				<p className="text-3xl font-semibold text-zinc-400">{playList[0]?.selectVideo.channelName}</p>
			</div>
			<YouTube
				videoId="SIuF37EWaLU"
				className="opacity-0 absolute"
				opts={opts}
				onReady={onReady}
				onPlay={() => onPlay()}
				onPause={() => onPause()}
				onEnd={() => onEnd()}
			/>
			<div className="flex items-center justify-center">
				<input
					onChange={handleProgressBarChange}
					onMouseUp={handleMouseUp}
					type="range"
					min="0"
					max="100"
					value={progress}
					style={{
						background: `linear-gradient(to right, #428EFF 0%, #428EFF ${progress}%, #d5d4d3 ${progress}%, #d5d4d3 100%)`,
					}}
				/>
				<span className="ml-2">{playTime}</span>
			</div>
			<StreamingBar
				isOwner={isOwner}
				roomId={musicRoomSeq}
				client={client}
				roomCode={roomCode}
				memberList={memberList}
			/>
		</>
	);
}
