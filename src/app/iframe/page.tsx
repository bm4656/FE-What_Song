'use client';

import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';

let videoElement: YouTubePlayer = null;

export default function IFramePage() {
	const [player, setPlayer] = useState<YouTubePlayer | null>(null);
	const [videoTime, setViewTime] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setViewTime(30);
		}, 2000);
	}, []);

	// 1초마다 재생시간 캐치
	// useEffect(() => {
	// 	const interval = setInterval(async () => {
	// 		if (videoElement && videoElement.getCurrentTime() > 0) {
	// 			const elapsed_seconds = videoElement.getCurrentTime();

	// 			// calculations
	// 			const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
	// 			const ms = elapsed_milliseconds % 1000;
	// 			const min = Math.floor(elapsed_milliseconds / 60000);
	// 			const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

	// 			setViewTime(seconds);

	// 			// verify video status
	// 			if (videoElement.playerInfo.playerState.PLAYING) {
	// 				console.log('비디오 실행중');
	// 			} else if (videoElement.playerInfo.playerState.PAUSED) {
	// 				console.log('비디오 정지중');
	// 			} else if (videoElement.playerInfo.playerState.ENDED) {
	// 				console.log('영상 재생이 완료되었습니다.');
	// 			}
	// 		}
	// 	}, 1000);

	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// }, []);

	// 실행, 정지, 타임라인 변경시 재생 시간 캐치
	// const onPlayerStateChange = (event: YouTubePlayer) => {
	// 	if (event.data === videoElement.playerInfo.playerState.PLAYING) {
	// 		console.log('영상이 재생 중입니다.');
	// 	} else if (event.data === videoElement.playerInfo.playerState.PAUSED) {
	// 		console.log('영상이 일시 중지되었습니다.');
	// 	} else if (event.data === videoElement.playerInfo.playerState.ENDED) {
	// 		console.log('영상 재생이 완료되었습니다.');
	// 	}

	// 	// 현재 재생 시간 정보
	// 	const currentTime = event.target.getCurrentTime();
	// 	console.log('현재 재생 시간: ' + currentTime + '초');
	// };

	return (
		<div>
			<YouTube
				id="iframe"
				videoId="cNG-QiCDphU"
				opts={{
					width: 300,
					height: 200,
					playerVars: {
						autoplay: 1,
						controls: 1,
						start: videoTime, // 시작 시간 컨트롤
					},
				}}
				// onPlay={(event) => {}}
				// onStateChange={onPlayerStateChange}
				// onPause={() => {}}
				onReady={(event) => {
					videoElement = event.target;
					setPlayer(event.target);
					event.target.playVideo();
				}}
			/>
		</div>
	);
}
