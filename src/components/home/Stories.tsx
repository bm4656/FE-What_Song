'use client';

import { useAtom } from 'jotai';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';

import SwiperCore from 'swiper';
import { EffectCube, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { modalAtom } from '@/state/store/modal';
import Progressbar from './Progressbar';

export default function Stories({ mainIndex, setMainIndex }: any) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const [subIndexHistory, setSubIndexHistory] = useState([0, 0, 0, 0]);
	const [musicPlayer, setMusicPlayer] = useState<YouTubePlayer>();
	const [firstVideoId, setFirstVideoId] = useState('');
	const [firstStartTime, setFirstStartTime] = useState(0);
	const [firstEndTime, setFirstEndTime] = useState(0);
	const [playing, setPlaying] = useState<boolean>(false);
	const swiperRef = useRef<SwiperCore>();
	const swiperMusic = useRef<SwiperCore>();
	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const STORIES_DATA = [
		{
			user: '박수빈',
			poster: [
				{
					videoId: 'LgQHPTRoI3c',
					thumbnail: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'SIuF37EWaLU',
					thumbnail:
						'https://i1.wp.com/saluteproject.com/wp-content/uploads/2019/11/2019-11-24-1.png?resize=800%2C450&ssl=1',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'aRDURmIYBZ4',
					thumbnail: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '이성호',
			poster: [
				{
					videoId: 'LgQHPTRoI3c',
					thumbnail: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'SIuF37EWaLU',
					thumbnail:
						'https://i1.wp.com/saluteproject.com/wp-content/uploads/2019/11/2019-11-24-1.png?resize=800%2C450&ssl=1',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'aRDURmIYBZ4',
					thumbnail: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '김보민',
			poster: [
				{
					videoId: 'LgQHPTRoI3c',
					thumbnail: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'SIuF37EWaLU',
					thumbnail:
						'https://i1.wp.com/saluteproject.com/wp-content/uploads/2019/11/2019-11-24-1.png?resize=800%2C450&ssl=1',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'aRDURmIYBZ4',
					thumbnail: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					startTime: 10,
					endTime: 25,
				},
			],
		},
		{
			user: '장준환',
			poster: [
				{
					videoId: 'LgQHPTRoI3c',
					thumbnail: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'SIuF37EWaLU',
					thumbnail:
						'https://i1.wp.com/saluteproject.com/wp-content/uploads/2019/11/2019-11-24-1.png?resize=800%2C450&ssl=1',
					startTime: 10,
					endTime: 25,
				},
				{
					videoId: 'aRDURmIYBZ4',
					thumbnail: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
					startTime: 10,
					endTime: 25,
				},
			],
		},
	];

	useEffect(() => {
		setSubIndexHistory([0, 0, 0, 0]);
	}, [modalOpen]);

	const onReady = (event: YouTubePlayer) => {
		setMusicPlayer(event.target);
	};

	// iframe 재생 시
	const onPlay = () => {
		console.log('재생...');
		setPlaying(true);
	};

	// iframe 정지 시
	const onPause = () => {
		console.log('정지...');
	};

	// iframe 노래 끝났을 때
	const onEnd = () => {
		console.log('끝...');
	};

	if (!modalOpen) return null;
	return (
		<div className="absolute inset-0 z-50 bg-black w-full h-screen">
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				touchReleaseOnEdges
				touchMoveStopPropagation
				nested
				effect="cube"
				initialSlide={mainIndex}
				onAfterInit={() => {
					const { videoId, startTime, endTime } = STORIES_DATA[mainIndex].poster[subIndexHistory[mainIndex]];
					setFirstVideoId(videoId);
					setFirstStartTime(startTime);
					setFirstEndTime(endTime);
				}}
				modules={[EffectCube]}
				onSlideChange={(_swiper) => {
					if (!swiperRef.current) return;
					if (swiperRef.current.activeIndex !== undefined) {
						const storyIndex = swiperRef.current.activeIndex;
						const { videoId, startTime, endTime } = STORIES_DATA[storyIndex].poster[subIndexHistory[storyIndex]];
						musicPlayer.loadVideoById({
							videoId,
							startSeconds: startTime,
							endSeconds: endTime,
							suggestedQuality: 'small',
						});
					}
				}}
			>
				{STORIES_DATA.map((main) => (
					<SwiperSlide key={main.user}>
						<div className="flex items-center w-full h-full">
							<div className="flex absolute z-50 insert-0 top-2 w-full px-2 justify-between">
								{/* {main.poster.map((prog, index) => (
                                    <Progressbar
                                        key={index}
                                        duration={Number(prog.endTime - prog.startTime + '000')}
                                        active={index === subIndexHistory[mainIndex] && playing}
                                    />
                                ))} */}
								<button onClick={() => swiperMusic.current?.slidePrev()}>Prev</button>
								<button onClick={() => swiperMusic.current?.slideNext()}>Next</button>
							</div>
							<div className="absolute z-50 insert-0 top-10">
								<span className="text-white text-3xl">{main.user}</span>
							</div>
							<button
								onClick={() => setModalOpen(false)}
								className="text-white text-2xl cursor-pointer absolute z-50 insert-0 right-4 top-10"
							>
								닫기
							</button>
							<Swiper
								onSwiper={(swiper) => {
									swiperMusic.current = swiper;
								}}
								navigation={{
									prevEl: prevRef.current,
									nextEl: nextRef.current,
								}}
								modules={[Navigation]}
								onSlideChange={(swiper) => {
									if (!swiperRef.current) return;
									const subIndex = swiper.activeIndex;
									const updatedHistory = [...subIndexHistory];
									updatedHistory[swiperRef.current.activeIndex] = subIndex;
									setSubIndexHistory(updatedHistory);
									const { videoId, startTime, endTime } = main.poster[subIndex];
									musicPlayer.loadVideoById({
										videoId,
										startSeconds: startTime,
										endSeconds: endTime,
										suggestedQuality: 'small',
									});
								}}
							>
								{main.poster.map((sub, _index) => (
									<SwiperSlide key={sub.thumbnail}>
										<img src={sub.thumbnail} alt={sub.thumbnail} className="w-full h-screen object-cover" />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
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
