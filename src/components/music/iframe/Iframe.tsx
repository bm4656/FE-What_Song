'use client';

import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { decode } from 'html-entities';
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
import { SimpleUser } from '@/types/user';

type Props = {
	roomId: number;
	roomCode: string;
	hostEmail: string;
};

type playListInfo = {
	recongnize: string;
	reservationId: string;
	roomSeq: number;
	selectVideo: {
		videoId: string;
		title: string;
		thumbnailUrl: string;
		channelName: string;
	};
};

type playingStatusInfo = {
	timeStamp: string;
	status: string;
};

export default function Iframe({ roomId, roomCode, hostEmail }: Props) {
	const [playList, setPlayList] = useState<playListInfo[]>([]);
	const [playing, setPlaying] = useState<string>('');
	const [musicPlayer, setMusicPlayer] = useState<YouTubePlayer | null>(null);
	const [playTime, setPlayTime] = useState<string>('0:00');
	const [playStatus, setPlayStatus] = useState<string>('NONE');
	const [progress, setProgress] = useState<number>(0);
	const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>(undefined);
	const [memberList, setMemberList] = useState<SimpleUser[]>([]);
	const [newMemberList, setNewMemberList] = useState<[]>([]);
	const [playingStatus, setPlayingStatus] = useState<playingStatusInfo>();
	const [musicIndex, setMusicIndex] = useState<number>(0);
	const [sockConnecting, setSockConnecting] = useState<boolean>(false);
	const musicSock = useRef<CompatClient>();
	const user = useUser();
	const memberSeq = user.data?.memberSeq;
	const userEmail = user.data?.email;
	const isOwner = userEmail === hostEmail;

	const wsConnectSubscribe = () => {
		musicSock.current = Stomp.over(() => {
			const sock = new SockJS(`${process.env.NEXT_PUBLIC_NGROK_URI}/ws-stomp`);
			return sock;
		});

		try {
			musicSock.current.connect(SOCKET_HEADER, () => {
				// 플레이 리스트 업데이트 구독
				playListStatusSubscribe(roomCode, musicSock, setPlayList);
				// 뮤직 상태 업데이트 구독
				musicStatusSubscribe(roomCode, musicSock, setPlayingStatus);
				// 입장 멤버 리스트 구독
				enterSubscribe(roomCode, musicSock, setNewMemberList);
				// 퇴장 멤버 리스트 구독
				leaveSubscribe(roomCode, musicSock, setNewMemberList);

				playlistStatusSend(roomCode, roomId, musicSock);
			});
			setSockConnecting(true);
		} catch (e: unknown) {
			// TODO 에러 핸들링
			alert(`소켓 연결 에러${e}`);
			setSockConnecting(false);
		}
	};

	// 뮤직 프로그레시브 실시간 업데이트
	const updateProgressBar = () => {
		const { progressState, currentPlayTime } = currentMusicInfo(musicPlayer);
		setProgress(progressState);
		setPlayTime(currentPlayTime);
	};

	// 뮤직 프로그레시브 점프
	const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const jump = Number(event.target.value);
		const { currentPlayTime } = currentMusicInfo(musicPlayer, jump);
		setProgress(jump);
		setPlayTime(currentPlayTime);
	};

	// 뮤직 점프
	const handleMouseUp = () => {
		const duration = musicPlayer.getDuration();
		const seekTime = (duration * progress) / 100;
		musicStatusUpdate(roomCode, musicSock, playing, playStatus, seekTime);
		musicPlayer.seekTo(seekTime);
	};

	// 현재 재생 노래 변경
	const musicChange = (music: string) => {
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlaying(music);
	};

	// iframe 재생 준비 완료
	const onReady = (event: YouTubePlayer) => {
		setMusicPlayer(event.target);
	};

	// iframe 재생 시
	const onPlay = () => {
		if (intervalId === undefined) {
			const { currentTime } = currentMusicInfo(musicPlayer);
			// 재생 시 뮤직 상태 send PLAYING
			if (isOwner) {
				musicStatusUpdate(roomCode, musicSock, playing, 'PLAYING', currentTime);
			}
			const newIntervalId = setInterval(updateProgressBar, 1000);
			setIntervalId(newIntervalId);
			setPlayStatus('PLAYING');
		}
	};

	// iframe 정지 시
	const onPause = () => {
		const { currentTime } = currentMusicInfo(musicPlayer);
		// 정지 시 뮤직 상태 send PAUSE 방장만
		if (isOwner) {
			musicStatusUpdate(roomCode, musicSock, playing, 'PAUSE', currentTime);
		}
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlayStatus('PAUSE');
	};

	// iframe 노래 끝났을 때
	const onEnd = () => {
		let nextIndex = playList.findIndex((item) => item.selectVideo.videoId === playing) + 1;
		setMusicIndex(nextIndex);
		if (playList.length === nextIndex) nextIndex = 0;
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlaying(playList[nextIndex].selectVideo.videoId);
	};

	useEffect(() => {
		if (!sockConnecting && musicPlayer) {
			wsConnectSubscribe();
			// 입장
		}
		if (sockConnecting) {
			enterSend(roomCode, musicSock);
		}
	}, [musicPlayer]);

	useEffect(() => {
		return () => {
			clearInterval(intervalId);
			// 퇴장
			if (sockConnecting) {
				leaveSend(roomCode, musicSock);
				musicSock.current!.disconnect();
			}
		};
	}, []);

	// 이전 멤버와 새로운 멤버 비교, 새 맴버 있으면 시간 업데이트
	useEffect(() => {
		if (newMemberList.length > memberList.length) {
			if (isOwner) {
				const { currentTime } = currentMusicInfo(musicPlayer);
				musicStatusUpdate(roomCode, musicSock, playing, playStatus, currentTime);
			}
			setMemberList(newMemberList);
			setNewMemberList([]);
		}
	}, [newMemberList]);

	// TODO 재생중인 뮤직 상태 변경 수정하기 && musicPlayer.videoTitle
	useEffect(() => {
		if (playingStatus && !isOwner) {
			const jumpTime = Number(playingStatus.timeStamp);
			if (playingStatus.status === 'PLAYING') {
				musicPlayer.playVideo();
				musicPlayer.seekTo(jumpTime);
			}
			if (playingStatus.status === 'PAUSE') {
				musicPlayer.seekTo(jumpTime);
				musicPlayer.pauseVideo();
			}
		}
	}, [playingStatus]);

	return (
		<>
			<MusicRecord
				image={playList.length > 0 ? playList[musicIndex]?.selectVideo.thumbnailUrl : '/assets/cover.jpeg'}
				isHost={isOwner}
				playStatus={playStatus}
				player={musicPlayer}
			/>
			<div className="flex flex-col justify-center items-center p-2 w-full">
				<p className="text-4xl font-bold line-clamp-1 text-center w-[80%]">
					{decode(playList[musicIndex]?.selectVideo.title)}
				</p>
				<p className="text-3xl font-semibold text-zinc-400">{playList[musicIndex]?.selectVideo.channelName}</p>
			</div>
			{playList && (
				<YouTube
					videoId={playList[musicIndex]?.selectVideo.videoId}
					className="opacity-0 absolute"
					opts={opts}
					onReady={onReady}
					onPlay={() => onPlay()}
					onPause={() => onPause()}
					onEnd={() => onEnd()}
				/>
			)}
			<div className="flex items-center justify-center">
				<input
					onChange={handleProgressBarChange}
					onMouseUp={handleMouseUp}
					onTouchEnd={handleMouseUp}
					type="range"
					min="0"
					max="100"
					value={progress}
					disabled={playList.length <= 0}
					style={{
						background: `linear-gradient(to right, #428EFF 0%, #428EFF ${progress}%, #d5d4d3 ${progress}%, #d5d4d3 100%)`,
						width: '20rem',
					}}
				/>
				<span className="ml-2 text-xl">{playTime}</span>
			</div>
			<StreamingBar
				isOwner={isOwner}
				memberSeq={memberSeq}
				roomId={roomId}
				musicSock={musicSock}
				roomCode={roomCode}
				memberList={memberList}
			/>
		</>
	);
}
