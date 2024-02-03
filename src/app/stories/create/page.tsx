'use client';

import { useEffect, useRef, useState } from 'react';
import { HiOutlineChevronUp } from 'react-icons/hi';
import YouTube, { YouTubePlayer } from 'react-youtube';
import Image from 'next/image';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import TitleHeader from '@/components/TitleHeader';
import PageHeaderContent from '@/components/PageHeaderContent';
import { ResVideo, StoryVideo } from '@/types/video';
import { currentMusicInfo } from '@/utils/iframe';
import equalizer from '../../../../public/assets/equalizer.png';
import '../../styles/storiesProgressbar.css';
import StoriesMusicBarCard from '@/components/music/card/StoriesMusicBarCard';
import StoriesSearchBar from '@/components/bar/StoriesSearchBar';
import { storyClients } from '@/app/service/stories';
import useUser from '@/hooks/useUser';

export default function CreateStoryPage() {
	const router = useRouter();
	const [searchList, setSearchList] = useState<StoryVideo[]>([]);
	const [selectMusic, setSelectMuisc] = useState<StoryVideo>();
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
	};

	const { mutate: createStoryMutate } = useMutation(storyClients.postCreateStory, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => console.log(error),
	});
	const user = useUser();
	const userSeq = user.data?.memberSeq;

	const onAddRoom = async () => {
		if (!selectMusic) return;
		createStoryMutate({
			memberSeq: userSeq,
			img_url: null,
			start: String(firstStartTime),
			end: String(firstStartTime + timeScale),
			storyVideoReq: {
				videoId: selectMusic.videoId,
				title: selectMusic.title,
				channelName: selectMusic.channelName,
				thumbnailUrl: selectMusic.thumbnailUrl,
			},
		});
		router.replace('/');
	};

	const searchFn = (list: ResVideo[]) => {
		setSearchList(list);
	};
	const removeFn = () => {
		setSearchList([]);
	};

	// 뮤직 프로그레시브 실시간 업데이트
	const updateProgressBar = () => {
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

	const handleAdd = (music: ResVideo) => {
		setSelectMuisc(music);
	};

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
				<StoriesSearchBar placeholder="공유하고 싶은 노래 검색!" searchFn={searchFn} removeFn={removeFn} />
				<div className=" absolute right-[4rem] top-[8rem]">
					{selectMusic && (
						<div>
							<Image
								src={selectMusic.thumbnailUrl}
								alt="앨범커버"
								width={120}
								height={100}
								style={{ objectFit: 'cover' }}
								className="rounded-[1.5rem] shadow-md shadow-zinc-400"
							/>
						</div>
					)}
				</div>
				<ul className="my-4 w-full flex flex-col gap-4 max-h-[50rem] overflow-scroll">
					{searchList?.map((item) => (
						<StoriesMusicBarCard
							key={item.videoId}
							music={{ ...item } as ResVideo & { roomSeq: number }}
							onAdd={handleAdd}
							barType="ADD"
						/>
					))}
				</ul>
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
				{selectMusic && (
					<>
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'red',
								backgroundImage: `url(${selectMusic.thumbnailUrl})`,
								filter: 'blur(20px)',
								zIndex: -1,
								backgroundPosition: 'center',
							}}
						/>
						<div className="w-full h-full flex flex-col items-center justify-center">
							<span className="text-white text-4xl">{selectMusic.title}</span>
							<div className="relative">
								<img
									src={selectMusic.thumbnailUrl}
									alt={selectMusic.thumbnailUrl}
									className="my-6 border-solid border-[2px] border-white w-[250px] h-[250px] rounded-xl object-cover"
								/>
								<span className="bg-white rounded-full flex items-center justify-center absolute top-[43%] left-[43%]">
									{playStatus === 'PLAYING' ? (
										<BsPauseFill
											onClick={() => {
												musicPlayer.pauseVideo();
												setPlayStatus('PAUSE');
											}}
											className="cursor-pointer w-14 h-14 p-0.5 ml"
										/>
									) : (
										<BsPlayFill
											onClick={() => {
												musicPlayer.playVideo();
												setPlayStatus('PLAYING');
											}}
											className="cursor-pointer last:w-14 h-14 p-0.5 ml-1"
										/>
									)}
								</span>
							</div>

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
							videoId={selectMusic.videoId}
							className="opacity-0 absolute"
							opts={{
								width: 1,
								height: 1,
								playerVars: {
									autoplay: 0,
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
				<Button content="공유하기" clickFn={onAddRoom} />
			</article>
		</>
	);
}
