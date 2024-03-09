import { YouTubePlayer } from 'react-youtube';
import { cookies } from 'next/headers';
import { getCookie } from '@/constants/cookie';

export const SOCKET_HEADER = {
	'Access-Control-Allow-Credentials': true,
	Authorization: `Bearer ${
		getCookie('accessToken') == undefined ? cookies().get('accessToken')?.value : getCookie('accessToken')
	}`,
};

export const currentMusicInfo = (musicPlayer: YouTubePlayer, jump: number | null = null) => {
	const currentTime = musicPlayer.getCurrentTime();
	const duration = musicPlayer.getDuration();
	const progressState = (currentTime / duration) * 100;

	let ms;
	if (jump) {
		const seekTime = (duration * jump) / 100;
		ms = Math.floor(seekTime * 1000);
	} else {
		ms = Math.floor(currentTime * 1000);
	}

	const min = Math.floor(ms / 60000);
	const seconds = Math.floor((ms - min * 60000) / 1000);
	const currentPlayTime = `${min}:${seconds < 10 ? `0${seconds}` : seconds}`;

	return { currentTime, duration, currentPlayTime, progressState };
};
