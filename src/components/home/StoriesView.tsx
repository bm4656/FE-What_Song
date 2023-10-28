'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { EffectCube, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useRouter } from 'next/navigation';
import { Icons } from '../../constants/ReactIcons';

export default function StoriesView({ selectIndex }: { selectIndex: number }) {
	const router = useRouter();
	const [subIndexHistory, setSubIndexHistory] = useState([0, 0, 0, 0]);
	const [musicPlayer, setMusicPlayer] = useState<YouTubePlayer>();
	const [firstVideoId, setFirstVideoId] = useState('');
	const [firstStartTime, setFirstStartTime] = useState(0);
	const [firstEndTime, setFirstEndTime] = useState(0);
	const [topIndex, setTopindex] = useState(0);
	const [subIndex, setSubindex] = useState(0);
	const [storyProgress, setStoryProgress] = useState<number[][]>([[]]);
	const [intervalId, setIntervalId] = useState<undefined | NodeJS.Timer>(undefined);
	const swiperRef = useRef<SwiperCore>();
	const swiperMusic = useRef<SwiperCore>();

	const STORIES_DATA = [
		{
			user: '박수빈',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'dJth8oW7CAQ',
					startTime: 25,
					endTime: 40,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://ilovecharacter.com/news/data/20230816/p1065623210683934_621_thum.jpg',
					videoId: '5yb2N3pnztU',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '이성호',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'kpeCOzKvK-0',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '김보민',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'gcgKUcJKxIs',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '장준환',
			poster: [
				{
					url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					videoId: 'SIuF37EWaLU',
					startTime: 10,
					endTime: 25,
				},
				{
					url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					videoId: 'kpeCOzKvK-0',
					startTime: 10,
					endTime: 25,
				},
			],
		},
	];

	useEffect(() => {
		const data = STORIES_DATA.map((story) => new Array(story.poster.length).fill(0));
		setStoryProgress(data);
		setSubIndexHistory([0, 0, 0, 0]);
		setTopindex(selectIndex);
		setSubindex(0);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const prev = () => {
		setFirstVideoId('');
		if (subIndex === 0) {
			swiperRef.current?.slidePrev();
		} else {
			clearInterval(intervalId);
			setIntervalId(undefined);
			const updatedProgress = [...storyProgress];
			updatedProgress[topIndex][subIndex] = 0;
			setStoryProgress(updatedProgress);

			setSubindex((prevIndex) => prevIndex - 1);
			const updatedHistory = [...subIndexHistory];
			updatedHistory[topIndex] = subIndex - 1;
			setSubIndexHistory(updatedHistory);
		}
	};

	const next = () => {
		setFirstVideoId('');
		if (subIndex === STORIES_DATA[topIndex].poster.length - 1) {
			if (topIndex === STORIES_DATA.length - 1) {
				router.replace('/');
			}
			swiperRef.current?.slideNext();
			setSubindex(0);
		} else {
			clearInterval(intervalId);
			setIntervalId(undefined);
			const updatedProgress = [...storyProgress];
			updatedProgress[topIndex][subIndex] = 100;
			setStoryProgress(updatedProgress);

			setSubindex((prevIndex) => prevIndex + 1);
			const updatedHistory = [...subIndexHistory];
			updatedHistory[topIndex] = subIndex + 1;
			setSubIndexHistory(updatedHistory);
		}
	};

	const onReady = (event: YouTubePlayer) => {
		setMusicPlayer(event.target);
	};

	// 뮤직 프로그레시브 실시간 업데이트
	const updateProgressBar = () => {
		const currentTime = musicPlayer.getCurrentTime();
		const progressState = ((currentTime - firstStartTime) / (firstEndTime - firstStartTime)) * 100;
		const updatedProgress = [...storyProgress];
		updatedProgress[topIndex][subIndex] = progressState;
		setStoryProgress(updatedProgress);
	};

	// iframe 재생 시
	const onPlay = () => {
		console.log('재생...');

		clearInterval(intervalId);
		setIntervalId(undefined);
		const newIntervalId = setInterval(updateProgressBar, 1000);
		setIntervalId(newIntervalId);
	};

	// iframe 정지 시
	const onPause = () => {
		console.log('정지...');
		clearInterval(intervalId);
		setIntervalId(undefined);
	};

	// iframe 노래 끝났을 때
	const onEnd = () => {
		console.log('끝');
		setFirstVideoId('');
		clearInterval(intervalId);
		setIntervalId(undefined);
	};

	useEffect(() => {
		const { videoId, startTime, endTime } = STORIES_DATA[topIndex].poster[subIndex];
		setFirstVideoId(videoId);
		setFirstStartTime(startTime);
		setFirstEndTime(endTime);
	}, [subIndex, topIndex]);

	return (
		<div className="w-full h-screen bg-black">
			<Swiper
				effect="cube"
				modules={[EffectCube]}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
					swiperRef.current.slideTo(selectIndex, 0, false);
				}}
				onAfterInit={() => {
					const { videoId, startTime, endTime } = STORIES_DATA[selectIndex].poster[0];
					setFirstVideoId(videoId);
					setFirstStartTime(startTime);
					setFirstEndTime(endTime);
				}}
				onSlideChange={(swiper) => {
					setFirstVideoId('');
					const swiperIndex = swiper.activeIndex;
					setTopindex(swiperIndex);
					setSubindex(subIndexHistory[swiperIndex]);
				}}
			>
				{STORIES_DATA.map((main, index) => (
					<SwiperSlide key={main.user}>
						<div className="z-50 flex items-center justify-between w-full absolute top-2 px-2">
							{storyProgress[index]?.map((progress, progressIndex) => (
								<div
									key={progressIndex}
									className={`overflow-hidden w-[100%] h-[10px] first:mr-4 ${
										storyProgress[index].length !== 2 && 'last:ml-4'
									} rounded-xl bg-[#eee]`}
								>
									<div className="h-[100%] bg-[#a66cff]" style={{ width: `${progress}%` }} />
								</div>
							))}
						</div>
						<div className="flex w-full justify-between absolute z-50 insert-0 top-12">
							<span className="text-white text-3xl">{main.user}</span>
							<button onClick={() => router.replace('/')} className="text-white text-6xl">
								{Icons.close}
							</button>
						</div>
						<Swiper
							nested
							onSwiper={(swiper) => {
								swiperMusic.current = swiper;
							}}
							pagination={{ clickable: true }}
							modules={[Pagination]}
							onSlideChange={(swiper) => {
								if (swiper.swipeDirection === 'next') {
									next();
								}
								if (swiper.swipeDirection === 'prev') {
									prev();
								}
							}}
						>
							{main.poster.map((post, postIndex) => (
								<SwiperSlide key={post.url + postIndex}>
									<img src={post.url} alt={post.url} className="w-full h-screen object-cover" />
								</SwiperSlide>
							))}
						</Swiper>
					</SwiperSlide>
				))}
			</Swiper>
			{firstVideoId && (
				<YouTube
					videoId={firstVideoId}
					className="opacity-0 absolute"
					opts={{
						width: 1,
						height: 1,
						playerVars: {
							autoplay: 1,
							controls: 1,
							start: firstStartTime,
							end: firstEndTime,
						},
					}}
					onReady={onReady}
					onPlay={() => onPlay()}
					onPause={() => onPause()}
					onEnd={() => onEnd()}
				/>
			)}
		</div>
	);
}
