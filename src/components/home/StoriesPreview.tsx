'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSetAtom } from 'jotai';
import Stories from './Stories';
import { modalAtom } from '@/state/store/modal';

export default function StoriesPreview() {
	const setModalOpen = useSetAtom(modalAtom);
	return (
		<>
			<div className="">
				<Swiper slidesPerView="auto" spaceBetween={16}>
					{[...new Array(8)].map((_, index) => (
						<SwiperSlide key={index} style={{ width: '85px' }}>
							<button onClick={() => setModalOpen(true)} className="flex flex-col items-center">
								<Image
									src="https://i.pinimg.com/564x/f0/a1/9f/f0a19f453d9201c3226c2a6d4be786c0.jpg"
									alt={`create${index}`}
									width={85}
									height={85}
									style={{ objectFit: 'cover' }}
									className="rounded-full mb-3"
								/>
								<span className="text-xl">{index === 0 ? '추가' : '닉네임'}</span>
							</button>
						</SwiperSlide>
					))}
				</Swiper>
				<Stories />
			</div>
		</>
	);
}
