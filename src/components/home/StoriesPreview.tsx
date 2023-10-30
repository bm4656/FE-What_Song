'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/navigation';
import { BsPlusSquare } from 'react-icons/bs';

export default function StoriesPreview() {
	const router = useRouter();
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
	];

	return (
		<>
			<div>
				<Swiper slidesPerView="auto" spaceBetween={16} slidesOffsetBefore={16}>
					<SwiperSlide style={{ width: '85px' }}>
						<button onClick={() => router.push(`/stories/create`)} className="flex flex-col items-center ">
							<div className="flex items-center justify-center w-[85px] h-[85px] bg-gray-200 rounded-full mb-3">
								<BsPlusSquare className="text-4xl" />
							</div>
							<span className="text-xl">스토리 작성</span>
						</button>
					</SwiperSlide>
					{STORIES_DATA.map((story, index) => (
						<SwiperSlide key={index} style={{ width: '85px' }}>
							<button onClick={() => router.push(`/stories/${index}`)} className="flex flex-col items-center">
								<Image
									src="https://i.pinimg.com/564x/f0/a1/9f/f0a19f453d9201c3226c2a6d4be786c0.jpg"
									alt={`story${index}`}
									width={85}
									height={85}
									style={{ objectFit: 'cover' }}
									className="rounded-full mb-3"
								/>
								<span className="text-xl">{story.user}</span>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
}
