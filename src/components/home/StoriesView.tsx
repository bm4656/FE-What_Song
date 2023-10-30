'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
			profile:
				'https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/24/holapet/20210524020226294iols.jpg',
			poster: [
				{
					title: '[MV] IU(아이유) _ Blueming(블루밍)',
					thumbnail:
						'https://i.namu.wiki/i/VB9Jks3DdhQdvJq4hCCWsxnBK2EpAix3j63Qh-rjDOXZEDJOIGoAYJ44It11KxbB4IJY45iJWzsOv_lGcuYJWQ.webp',
					videoId: 'D1PvIWdJ8xo',
					startTime: 46,
					endTime: 60,
				},
				{
					title: 'GODS (ft. 뉴진스) (공식 뮤직 비디오) | 2023 월드 챔피언십 주제곡 - 리그 오브 레전드',
					thumbnail:
						'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/0a/34/4d/0a344d13-8b5e-8f88-fab0-a4b36aa520a0/811395039915.png/1200x1200bf-60.jpg',
					videoId: 'C3GouGa0noM',
					startTime: 40,
					endTime: 55,
				},
				{
					title: 'Worlds Collide',
					thumbnail:
						'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/53/d9/be/53d9be12-bf5d-726c-39f7-487b7884f816/859715616194.png/1200x1200bf-60.jpg',
					videoId: 'u_hBDT6uRuQ',
					startTime: 13,
					endTime: 28,
				},
			],
		},
		{
			user: '너구리의 갱즈의 리더 갱',
			profile: 'https://i1.ruliweb.com/cmt/17/07/07/15d199f7dc9346e89.jpeg',
			poster: [
				{
					title: 'キタニタツヤ「青のすみか」',
					thumbnail: 'https://i1.sndcdn.com/artworks-5DkDarrIPyczQi2L-Ig5DlA-t500x500.jpg',
					videoId: 'gcgKUcJKxIs',
					startTime: 46,
					endTime: 60,
				},
				{
					title: '[MV] OH MY GIRL(오마이걸) _ The fifth season(다섯 번째 계절) (SSFWL)',
					thumbnail: 'https://image.yes24.com/goods/72297332/XL',
					videoId: 'udGwca1HBM4',
					startTime: 60,
					endTime: 85,
				},
			],
		},
		{
			user: '밍승배잉',
			profile:
				'https://img.imageimg.net/upload/portal/category_push/img/banner_1002088_97ad5df7ddf09ce1fa519c62bc49808ff1507cf3.jpg',
			poster: [
				{
					title: 'Kyrie（アイナ・ジ・エンド）- キリエ・憐れみの讃歌',
					thumbnail:
						'https://img.imageimg.net/upload/portal/category_push/img/banner_1002088_97ad5df7ddf09ce1fa519c62bc49808ff1507cf3.jpg',
					videoId: 'BI4zNteRP7E',
					startTime: 207,
					endTime: 222,
				},
				{
					title: 'Shutter',
					thumbnail: 'https://static.qobuz.com/images/covers/gc/s4/m3kl9jlsws4gc_600.jpg',
					videoId: 'VUY4DIuZAQI',
					startTime: 111,
					endTime: 126,
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

	const prev = (jumpIndex: number) => {
		setFirstVideoId('');
		if (subIndex === 0) {
			swiperRef.current?.slidePrev();
		} else {
			clearInterval(intervalId);
			setIntervalId(undefined);
			const updatedProgress = [...storyProgress];
			updatedProgress[topIndex][subIndex] = 0;
			setStoryProgress(updatedProgress);
			setSubindex((prevIndex) => (jumpIndex || jumpIndex === 0 ? jumpIndex : prevIndex - 1));
			const updatedHistory = [...subIndexHistory];
			updatedHistory[topIndex] = subIndex - 1;
			setSubIndexHistory(updatedHistory);
		}
	};

	const next = (jumpIndex: number) => {
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

			setSubindex((prevIndex) => jumpIndex || prevIndex + 1);
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
				spaceBetween={16}
				className="h-screen"
				direction="vertical"
				modules={[Pagination]}
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
						<Swiper
							className="w-full"
							spaceBetween={16}
							onSwiper={(swiper) => {
								swiperMusic.current = swiper;
							}}
							navigation
							pagination={{
								clickable: true,
								el: '.swiper-pagination-custom',
								bulletClass: 'custom_bullet',
								bulletActiveClass: 'swiper-pagination-custom-bullet-active',
								renderBullet(bulletIndex, className) {
									return `<div class="${className}"><img src="${main.poster[bulletIndex].thumbnail}"></div>`;
								},
							}}
							modules={[Navigation, Pagination]}
							onSlideChange={(swiper) => {
								if (swiper.previousIndex < swiper.activeIndex) {
									next(swiper.activeIndex);
								}
								if (swiper.previousIndex > swiper.activeIndex) {
									prev(swiper.activeIndex);
								}
							}}
						>
							{main.poster.map((post, postIndex) => (
								<SwiperSlide key={post.thumbnail + postIndex}>
									<div className="z-50 flex items-center justify-between absolute top-2 px-2">
										{/* {storyProgress[index]?.map((progress, progressIndex) => (
											<div
												key={progressIndex}
												className={`overflow-hidden w-[100%] h-[10px] first:mr-4 ${
													storyProgress[index].length !== 2 && 'last:ml-4'
												} rounded-xl bg-[#eee]`}
											>
												<div className="h-[100%] bg-[#ee5253]" style={{ width: `${progress}%` }} />
											</div>
										))} */}
									</div>
									<div className="flex justify-between p-6">
										<div className="flex items-center">
											<img className="w-[50px] h-[50px] rounded-full mr-2" src={main.profile} alt="smaliCat" />
											<div className="flex flex-col">
												<span className="text-white text-3xl">{main.user}</span>
												<span className="text-gray-200 text-xl">23분전</span>
											</div>
										</div>
										<button onClick={() => router.replace('/')} className="text-white text-6xl">
											{Icons.close}
										</button>
									</div>
									<div className="flex flex-col mx-8 items-center justify-center h-screen max-w-[50rem]">
										<div
											style={{
												position: 'absolute',
												top: 0,
												left: 0,
												width: '100%',
												height: '100%',
												backgroundImage: `url(${post.thumbnail})`,
												filter: 'blur(20px)',
												zIndex: -1,
												backgroundPosition: 'center',
											}}
										/>
										<input
											onChange={undefined}
											type="range"
											min="0"
											max="100"
											value={storyProgress[topIndex][subIndex]}
											style={{
												width: '29rem',
												height: '0.8rem',
												background: `linear-gradient(to right, #ee5253 0%, #ee5253 ${storyProgress[topIndex][subIndex]}%, #eee ${storyProgress[topIndex][subIndex]}%, #fff 100%)`,
											}}
										/>
										<span className="my-6 text-white text-4xl">{post.title}</span>
										<div className="flex flex-col items-center mx-8 mb-[14rem]">
											<img
												src={post.thumbnail}
												alt={post.thumbnail}
												className="border-solid border-[2px] border-white w-[250px] h-[250px] rounded-xl object-cover"
											/>
										</div>
									</div>
								</SwiperSlide>
							))}
							<div className="swiper-pagination-custom" />
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
