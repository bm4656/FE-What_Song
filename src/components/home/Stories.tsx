'use client';

import { useAtom } from 'jotai';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { EffectCube, Navigation, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { modalAtom } from '@/state/store/modal';
import { storyOpts } from '@/constants/iframe';

export default function Stories() {
	const [storyIndex, setStoryIndex] = useState(0);
	const [storiesIndex, setStoriesIndex] = useState(0);
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const [musicPlayer, setMusicPlayer] = useState<YouTubePlayer | null>(null);

	const swiperRef = useRef<SwiperCore>();
	const swiperMusic = useRef<SwiperCore>();
	const STORIES_DATA = [
		{
			user: '박수빈',
		},
		{
			user: '이성호',
		},
		{
			user: '김보민',
		},
		{
			user: '장준환',
		},
	];
	const POST_DATA = [
		{
			videoId: 'LgQHPTRoI3c',
			url: 'https://www.sonymusic.co.jp/img/common/artist_image/70007000/70007781/images/202202211748560.jpg',
		},
		{
			videoId: 'SIuF37EWaLU',
			url: 'https://i1.wp.com/saluteproject.com/wp-content/uploads/2019/11/2019-11-24-1.png?resize=800%2C450&ssl=1',
		},
		{
			videoId: 'aRDURmIYBZ4',
			url: 'https://thetv.jp/i/nw/1080602/10786636.jpg?w=1284',
		},
	];

	const onReady = (event: YouTubePlayer) => {
		setMusicPlayer(event.target);
	};

	// iframe 재생 시
	const onPlay = () => {
		console.log('재생...');
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
			<div />
			<Swiper
				touchReleaseOnEdges
				touchMoveStopPropagation
				nested
				loop
				effect="cube"
				modules={[EffectCube]}
				onSlideChange={(_swiper) => {
					setStoriesIndex(0);
					console.log(swiperMusic.current?.activeIndex);
					musicPlayer.seekTo(0);
					swiperMusic.current?.slideTo(0, 0, false);
				}}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
			>
				{STORIES_DATA.map((data) => (
					<SwiperSlide key={data.user}>
						<div className="flex items-center w-screen h-screen">
							<div className="absolute z-50 insert-0 top-4">
								<span className="text-white text-3xl">{data.user}</span>
							</div>
							<button
								onClick={() => setModalOpen(false)}
								className="text-white text-2xl cursor-pointer absolute z-50 insert-0 right-4 top-4"
							>
								닫기
							</button>
							<Swiper
								onSwiper={(swiper) => {
									swiperMusic.current = swiper;
								}}
								navigation
								modules={[Navigation]}
								onSlideChange={(swiper) => {
									setStoriesIndex(swiper.activeIndex);
								}}
							>
								{POST_DATA.map((post, index) => {
									return (
										<SwiperSlide>
											<img src={post.url} alt={`post${index}`} className="w-screen h-screen object-cover" />
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<YouTube
				videoId={POST_DATA[storiesIndex].videoId}
				className="opacity-0 absolute"
				opts={storyOpts}
				onReady={onReady}
				onPlay={() => onPlay()}
				onPause={() => onPause()}
				onEnd={() => onEnd()}
			/>
		</div>
	);
}
