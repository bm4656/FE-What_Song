'use client';

import { useRef } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import Image from 'next/image';
import Button from '@/components/button/Button';
import CategoryGrid from '@/components/music/CategoryGrid';
import TitleHeader from '@/components/TitleHeader';
import MusicRecord from '@/components/music/streaming/MusicRecord';
import PageHeaderContent from '@/components/PageHeaderContent';
import InputBar from '@/components/bar/InputBar';

export default function CreateRoomPage() {
	const focusFirst = useRef<HTMLDivElement>(null);
	const focusSecond = useRef<HTMLDivElement>(null);
	const focusLast = useRef<HTMLDivElement>(null);
	const onMoveToFocus = (focus: React.RefObject<HTMLDivElement>) => {
		focus.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	const handleChange = () => {
		console.log('test');
	};
	return (
		<>
			<article ref={focusFirst} className="flex flex-col h-full items-start mb-5 p-[2rem]">
				<TitleHeader title="뮤직방 생성" previous isWrap />
				<MusicRecord image="/assets/sample.png" />
				<PageHeaderContent
					content="당신의 플레이리스트의
					<br /> 이름을 정해주세요!🔥"
					mb="mb-5"
				/>
				<InputBar placeholder="음악 방의 이름을 입력해주세요!" value="" onChange={handleChange} />
				<HiOutlineChevronDown className="absolute bottom-32 text-4xl flex self-center" />
				<Button content="다음" clickFn={() => onMoveToFocus(focusSecond)} />
			</article>
			<article ref={focusSecond} className="flex flex-col relative h-full items-start my-32 p-[2rem]">
				<TitleHeader title="뮤직방 생성" />
				<PageHeaderContent
					content="당신의 플레이리스트의
					<br /> 카테고리를 알려주세요!🎧"
					mt="mt-10"
					mb="mb-5"
				/>
				<InputBar value="" placeholder="카테고리를 알려주세요!" onChange={handleChange} />
				<CategoryGrid />
				<HiOutlineChevronUp
					className="absolute bottom-32 text-4xl cursor-pointer flex self-center"
					onClick={() => onMoveToFocus(focusFirst)}
				/>
				<Button content="다음" clickFn={() => onMoveToFocus(focusLast)} />
			</article>
			<article ref={focusLast} className="flex flex-col relative h-full items-start justify-between p-[2rem]">
				<TitleHeader title="뮤직방 생성" isWrap />
				<div className="w-80 h-80 relative rounded-[4rem] shadow-2xl shadow-slate-700 overflow-hidden self-center">
					<Image src="/assets/sample.png" fill alt="이미지" />
				</div>
				<article className="flex flex-col w-full gap-4 py-32">
					<PageHeaderContent content="공개 여부를 결정해주세요! ✍️ " />
					<div className="bg-input rounded-[10px] w-[98%] h-15 self-center p-4 text-2xl flex justify-center items-center font-bold">
						전체 공개
					</div>
					<div className="bg-input rounded-[10px] w-[98%] h-15 self-center p-4 text-2xl flex justify-center items-center font-bold">
						친구 공개
					</div>
					<div className="bg-input rounded-[10px] w-[98%] h-15 self-center p-4 text-2xl flex justify-center items-center font-bold">
						비공개
					</div>
					<p className="text-xl text-zinc-300 font-semibold p-2 w-full self-center">
						💡 모든 사람들에게 공개되는 방이에요! <br />
						<span className="text-white">___</span> 인기 방 순위에 올라갈 수도 있답니다!
					</p>
				</article>
				<HiOutlineChevronUp
					className="absolute bottom-32 text-4xl cursor-pointer flex self-center"
					onClick={() => onMoveToFocus(focusSecond)}
				/>
				<Button content="다음" link="room/create/success" />
			</article>
		</>
	);
}
