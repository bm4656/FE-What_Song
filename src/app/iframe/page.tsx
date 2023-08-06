'use client';

import { useEffect, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { opts } from '@/constants/iframe';

export default function IFramePage() {
	const [playList, setPlayList] = useState(['BBdC1rl5sKY', 'tgFePudZU8k']);
	const [playing, setPlaying] = useState('BBdC1rl5sKY');
	const [player, setPlayer] = useState<YouTubePlayer | null>(null);
	// const [playTimeRecord, setPlayTimeRecord] = useState<number>(0);
	const [playTime, setPlayTime] = useState<string>('0:00');
	const [progress, setProgress] = useState<number>(0);
	const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>(undefined);

	const updateProgressBar = () => {
		const currentTime = player.getCurrentTime();
		const duration = player.getDuration();
		const progressState = (currentTime / duration) * 100;
		setProgress(progressState);

		const ms = Math.floor(currentTime * 1000);
		const min = Math.floor(ms / 60000);
		const seconds = Math.floor((ms - min * 60000) / 1000);
		setPlayTime(`${min}:${seconds < 10 ? `0${seconds}` : seconds}`);
	};

	// 실행, 정지, 타임라인 변경시 재생 시간 캐치
	const onPlayerStateChange = (event: YouTubePlayer) => {
		if (event.data === 1) {
			// console.log('영상이 재생 중입니다.');
		} else if (event.data === 2) {
			// console.log('영상이 일시 중지되었습니다.');
		} else if (event.data === 0) {
			// console.log('영상 재생이 완료되었습니다.');
		}
		// 현재 재생 시간 정보
		// 	const currentTime = event.target.getCurrentTime();
		// 	console.log('현재 재생 시간: ' + currentTime + '초');
	};

	const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const jump = Number(event.target.value);
		setProgress(jump);
	};

	const handleMouseUp = () => {
		const duration = player.getDuration();
		const seekTime = (duration * progress) / 100;
		// TODO 점프 후 서버에게 시간 데이터 보내기
		player.seekTo(seekTime);
	};

	const musicChange = (music: string) => {
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlaying(music);
	};

	useEffect(() => {
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<YouTube
				id="iframe"
				videoId={playing}
				className="opacity-0 absolute"
				opts={opts}
				onStateChange={onPlayerStateChange}
				onReady={(event) => {
					setPlayer(event.target);
					event.target.playVideo();
				}}
				onPlay={() => {
					if (intervalId === undefined) {
						const newIntervalId = setInterval(updateProgressBar, 1000);
						setIntervalId(newIntervalId);
					}
				}}
				// onPlay={(event) => {}}
				// onPause={() => {}}
				onEnd={() => {
					let nextIndex = playList.findIndex((item) => item === playing) + 1;
					if (playList.length === nextIndex) nextIndex = 0;
					clearInterval(intervalId);
					setIntervalId(undefined);
					setPlaying(playList[nextIndex]);
				}}
			/>
			<div>재생중인 노래 : {playing}</div>
			<div>
				<button onClick={() => player.playVideo()}>재생</button>
			</div>
			<div>
				<button onClick={() => player.pauseVideo()}>정지</button>
			</div>
			<div>{playTime}</div>
			<div>
				<input
					onChange={handleProgressBarChange}
					onMouseUp={handleMouseUp}
					type="range"
					min="0"
					max="100"
					value={progress}
					id="progressBar"
					step="1"
				/>
			</div>
			<div>
				뮤직 리스트 :{' '}
				{playList?.map((music) => (
					<button onClick={() => musicChange(music)}>{music}, </button>
				))}
			</div>
		</div>
	);
}
