'use client';

import { useEffect, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { opts } from '@/constants/iframe';
import { currentMusicInfo } from '@/utils/iframe';

// MEMO 서버에게 썸네일, 영상 길이 받아오기

export default function IFramePage() {
	const [playList, setPlayList] = useState(['BBdC1rl5sKY', 'tgFePudZU8k']);
	const [playing, setPlaying] = useState('BBdC1rl5sKY');
	const [player, setPlayer] = useState<YouTubePlayer | null>(null);
	// const [playTimeRecord, setPlayTimeRecord] = useState<number>(0);
	const [playTime, setPlayTime] = useState<string>('0:00');
	const [progress, setProgress] = useState<number>(0);
	const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>(undefined);

	const updateProgressBar = () => {
		const { progressState, currentPlayTime } = currentMusicInfo(player);
		setProgress(progressState);
		setPlayTime(currentPlayTime);
	};

	const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const jump = Number(event.target.value);
		const { currentPlayTime } = currentMusicInfo(player, jump);
		setProgress(jump);
		setPlayTime(currentPlayTime);
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

	const onReady = (event: YouTubePlayer) => {
		setPlayer(event.target);
		event.target.playVideo();
	};

	const onPlay = () => {
		if (intervalId === undefined) {
			const newIntervalId = setInterval(updateProgressBar, 1000);
			setIntervalId(newIntervalId);
		}
	};

	const onPause = () => {
		clearInterval(intervalId);
		setIntervalId(undefined);
	};

	const onEnd = () => {
		let nextIndex = playList.findIndex((item) => item === playing) + 1;
		if (playList.length === nextIndex) nextIndex = 0;
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlaying(playList[nextIndex]);
	};

	useEffect(() => {
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<YouTube
				videoId={playing}
				className="opacity-0 absolute"
				opts={opts}
				onReady={onReady}
				onPlay={() => onPlay()}
				// onPlay={(event) => {}}
				onPause={() => onPause()}
				onEnd={() => onEnd()}
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
					style={{
						background: `linear-gradient(to right, #428EFF 0%, #428EFF ${progress}%, #d5d4d3 ${progress}%, #d5d4d3 100%)`,
					}}
				/>
			</div>
			<div>
				뮤직 리스트 :{' '}
				{playList?.map((music, index) => (
					<button key={music} className="mr-2" onClick={() => musicChange(music)}>
						{index + 1} : {music}
					</button>
				))}
			</div>
		</div>
	);
}
