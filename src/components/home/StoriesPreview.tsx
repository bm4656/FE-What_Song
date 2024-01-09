'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/navigation';
import { BsPlusSquare } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSetAtom } from 'jotai';
import { storyClients } from '@/app/service/stories';
import useUser from '@/hooks/useUser';
import { storiesInfo } from '@/state/store/stories';
import StoriesLoader from '../skeleton/StoriesLoader';

export default function StoriesPreview() {
	const setStoriesInfo = useSetAtom(storiesInfo);
	const router = useRouter();
	const user = useUser();
	const userSeq = user.data?.memberSeq;

	const { data: stories, isLoading } = useQuery(['stories'], () => storyClients.getStories(userSeq), {
		onSuccess: (res) => {
			setStoriesInfo(res.data);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: !!userSeq,
		// select: (data) => data.data,
	});

	if (isLoading) {
		return <StoriesLoader />;
	}

	return (
		<section className="w-full shadow-sm shadow-neutral-300 mb-5 pb-3 rounded-lg min-h-[90px] overflow-x-auto">
			<Swiper slidesPerView="auto" spaceBetween={16} slidesOffsetBefore={16}>
				<SwiperSlide style={{ width: '80px' }}>
					<button onClick={() => router.push(`/stories/create`)} className="flex flex-col items-center ">
						<div className="flex items-center justify-center w-[80px] h-[80px] bg-gray-200 rounded-full mb-3">
							<BsPlusSquare className="text-4xl" />
						</div>
						<span className="text-xl  text-neutral-500">스토리 작성</span>
					</button>
				</SwiperSlide>
				{stories?.data.map((story: { memberName: string }, index: number) => (
					<SwiperSlide key={index} style={{ width: '80px' }}>
						<Link href={`/stories/${index}`} className="flex flex-col items-center">
							<Image
								src="https://i.pinimg.com/564x/f0/a1/9f/f0a19f453d9201c3226c2a6d4be786c0.jpg"
								alt={`story${index}`}
								width={85}
								height={85}
								style={{ objectFit: 'cover' }}
								className="rounded-full mb-3"
							/>
							<span className="text-xl text-neutral-500">{story.memberName}</span>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
