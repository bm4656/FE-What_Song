'use client';

import { useEffect, useRef, useState } from 'react';
import { HiOutlineChevronUp } from 'react-icons/hi';
import YouTube, { YouTubePlayer } from 'react-youtube';
import Button from '@/components/button/Button';
import TitleHeader from '@/components/TitleHeader';
import PageHeaderContent from '@/components/PageHeaderContent';
import SearchBar from '@/components/bar/SearchBar';
import { ResVideo } from '@/types/video';
import { currentMusicInfo } from '@/utils/iframe';
import equalizer from '../../../../public/assets/equalizer.png';
import '../../styles/storiesProgressbar.css';

export default function CreateStoryPage() {
	const [searchList, setSearchList] = useState<any>([]);
	const [musicPlayer, setMusicPlayer] = useState<YouTubePlayer | null>(null);
	const [playTime, setPlayTime] = useState<string>('0:00');
	const [endPlayTime, setEndPlayTime] = useState<string>('0:00');
	const [timeScale, setTimeScale] = useState<number>(15);
	const [progress, setProgress] = useState<number>(0);
	const [storyProgress, setStoryProgress] = useState<number>(0);
	const [playStatus, setPlayStatus] = useState<string>('PAUSE');
	const focusFirst = useRef<HTMLDivElement>(null);
	const focusSecond = useRef<HTMLDivElement>(null);
	const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>(undefined);
	const [firstStartTime, setFirstStartTime] = useState(0);

	const onMoveToFocus = (focus: React.RefObject<HTMLDivElement>) => {
		focus.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		if (focus === focusSecond) {
			setSearchList([
				{
					title: 'キタニタツヤ「青のすみか」',
					thumbnail: 'https://i1.sndcdn.com/artworks-5DkDarrIPyczQi2L-Ig5DlA-t500x500.jpg',
					videoId: 'gcgKUcJKxIs',
					startTime: 46,
					endTime: 60,
				},
			]);
		}
	};

	const onAddRoom = async () => {
		// createMusicRoomMutate({ ...data });
	};

	const searchFn = (list: ResVideo[]) => {
		// console.log('동작', list[0]);
		// setSearchList(list);
	};
	const removeFn = () => {
		setSearchList([]);
	};

	// 뮤직 프로그레시브 실시간 업데이트
	const updateProgressBar = () => {
		console.log(2);
		const { currentTime, progressState } = currentMusicInfo(musicPlayer);
		setProgress(progressState);

		const storyProgressState = ((currentTime - firstStartTime) / (firstStartTime + (timeScale - firstStartTime))) * 100;
		setStoryProgress(storyProgressState);
	};

	const onReady = (event: YouTubePlayer) => {
		setMusicPlayer(event.target);
		setEndPlayTime('0:15');
	};

	// iframe 재생 시
	const onPlay = () => {
		const newIntervalId = setInterval(updateProgressBar, 1000);
		setIntervalId(newIntervalId);
	};

	// iframe 정지 시
	const onPause = () => {
		clearInterval(intervalId);
		setIntervalId(undefined);
		setPlayStatus('PAUSE');

		const ms = Math.floor((firstStartTime + timeScale) * 1000);
		const min = Math.floor(ms / 60000);
		const seconds = Math.floor((ms - min * 60000) / 1000);
		const currentPlayTime = `${min}:${seconds < 10 ? `0${seconds}` : seconds}`;
		setEndPlayTime(currentPlayTime);
	};

	// iframe 노래 끝났을 때
	const onEnd = () => {
		clearInterval(intervalId);
		setIntervalId(undefined);
		setStoryProgress(100);
		setPlayStatus('PAUSE');
	};

	// 뮤직 프로그레시브 점프
	const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const jump = Number(event.target.value);
		const { currentPlayTime } = currentMusicInfo(musicPlayer, jump);
		setProgress(jump);
		setPlayTime(currentPlayTime);
		setStoryProgress(0);
	};

	// 뮤직 점프
	const handleMouseUp = () => {
		musicPlayer.pauseVideo();
		setPlayStatus('PAUSE');
		const duration = musicPlayer.getDuration();
		const seekTime = (duration * progress) / 100;
		musicPlayer.seekTo(seekTime);
		setFirstStartTime(seekTime);
	};

	useEffect(() => {
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<>
			<article ref={focusFirst} className="flex flex-col relative h-full items-start p-[2rem]">
				<TitleHeader title="스토리 생성" isWrap />
				<PageHeaderContent
					content="공유하고 싶은 노래를
					<br /> 검색해주세요 🎶"
					mt="mt-10"
					mb="mb-5"
				/>
				<div className="w-full">
					<SearchBar placeholder="공유하고 싶은 노래 검색!" searchFn={searchFn} removeFn={removeFn} />
				</div>

				{/* <MusicBars list={searchList}   /> */}
				<HiOutlineChevronUp
					className="absolute bottom-32 text-4xl cursor-pointer flex self-center"
					onClick={() => onMoveToFocus(focusFirst)}
				/>
				<Button content="다음" clickFn={() => onMoveToFocus(focusSecond)} />
			</article>
			<article
				ref={focusSecond}
				className="flex flex-col relative h-full items-start justify-between p-[2rem] bg-cover"
			>
				{/* <TitleHeader title="뮤직방 생성" isWrap /> */}
				{searchList[0] && (
					<>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'red',
								backgroundImage: `url(${searchList[0].thumbnail})`,
								filter: 'blur(20px)',
								zIndex: -1,
								backgroundPosition: 'center',
							}}
						/>
						<div className="w-full h-full flex flex-col items-center justify-center">
							<span className="text-white text-4xl">{searchList[0].title}</span>
							<img
								src={searchList[0].thumbnail}
								alt={searchList[0].thumbnail}
								className="my-6 border-solid border-[2px] border-white w-[250px] h-[250px] rounded-xl object-cover"
							/>
							<div className="flex mb-6">
								{[5, 10, 15].map((time) => (
									<button
										onClick={() => {
											setStoryProgress(0);
											setTimeScale(time);
											musicPlayer.playVideo();
											setPlayStatus('PLAYING');
										}}
										className={`${
											timeScale === time ? 'bg-[#ee5253] text-white' : 'opacity-[0.5] bg-[#fff] '
										}  w-[35px] h-[35px] flex items-center justify-center mx-2 rounded-full`}
										key={time}
									>
										<span className="text-3xl ">{time}</span>
									</button>
								))}
							</div>
							<div className="overflow-hidden w-[60%] h-[10px] first:mr-4 rounded-xl bg-[#eee]">
								<div className="h-[100%] bg-[#ee5253]" style={{ width: `${storyProgress <= 100 && storyProgress}%` }} />
							</div>
							<div className="flex">
								{/* <button
							onClick={() => {
								if (playStatus === 'PLAYING') {
									musicPlayer.pauseVideo();
									setPlayStatus('PAUSE');
								}
								if (playStatus === 'PAUSE') {
									musicPlayer.playVideo();
									setPlayStatus('PLAYING');
								}
							}}
							className="text-3xl text-white"
						>
							재생
						</button> */}
							</div>
							<div className="flex mt-6">
								<span className="text-white text-3xl">
									{playTime} ~ {endPlayTime}
								</span>
							</div>
							<input
								className="mt-6"
								onChange={handleProgressBarChange}
								onMouseUp={handleMouseUp}
								onTouchEnd={handleMouseUp}
								type="range"
								min="0"
								max="100"
								value={progress}
								style={{
									width: '35rem',
									height: '4rem',
									backgroundColor: 'black',
									border: '1px solid #ee5253',
									backgroundImage: `url(${equalizer.src})`,
									backgroundPosition: 'center',
									borderRadius: 12,
								}}
							/>
						</div>
						<YouTube
							videoId={searchList[0].videoId}
							className="opacity-0 absolute"
							opts={{
								width: 1,
								height: 1,
								playerVars: {
									autoplay: 1,
									controls: 1,
									start: firstStartTime,
									end: firstStartTime + timeScale,
								},
							}}
							onReady={onReady}
							onPlay={() => onPlay()}
							onPause={() => onPause()}
							onEnd={() => onEnd()}
						/>
					</>
				)}

				<HiOutlineChevronUp
					className="absolute bottom-32 text-4xl cursor-pointer flex self-center"
					onClick={() => onMoveToFocus(focusSecond)}
				/>
				<Button content="공유하기" link="room/create/success" clickFn={onAddRoom} />
			</article>
		</>
	);
}
