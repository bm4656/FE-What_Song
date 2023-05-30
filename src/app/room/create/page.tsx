'use client';

import { useRef } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { AiOutlineLeft } from 'react-icons/ai';
import Image from 'next/image';
import Button from '@/components/Button';
import MusicRecord from '@/components/MusicRecord';
import CategoryGrid from '@/components/CategoryGrid';
import TitleHeader from '@/components/TitleHeader';

export default function CreateRoomPage() {
	const focusFirst = useRef<HTMLDivElement>(null);
	const focusSecond = useRef<HTMLDivElement>(null);
	const focusLast = useRef<HTMLDivElement>(null);
	const onMoveToFocus = (focus: React.RefObject<HTMLDivElement>) => {
		focus.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	return (
		<>
			<article ref={focusFirst} className="flex flex-col h-full items-start gap-5">
				<TitleHeader title="뮤직방 생성" previous />
				<MusicRecord image="/assets/sample.png" />
				<h2 className="text-3xl font-bold ml-10 p-2">
					당신의 플레이리스트의
					<br /> 이름을 정해주세요!🔥
				</h2>
				<input
					className="bg-input rounded-[10px] w-[88%] h-20 self-center p-4 text-2xl"
					type="text"
					name=""
					id=""
					placeholder="음악 방의 이름을 입력해주세요!"
				/>
				<HiOutlineChevronDown className="w-full absolute bottom-32 text-4xl" />
				<Button name="다음" onClick={() => onMoveToFocus(focusSecond)} />
			</article>
			<article ref={focusSecond} className="flex flex-col relative h-full pt-32 items-start gap-5">
				<header className="w-full absolute my-1 top-0 h-20 flex items-center justify-center text-3xl font-bold">
					<AiOutlineLeft
						className="absolute left-0 top-0 w-20 h-20 p-4 cursor-pointer"
						onClick={() => onMoveToFocus(focusFirst)}
					/>
					뮤직방 생성
				</header>
				<h2 className="text-3xl font-bold ml-10 p-2">
					당신의 플레이리스트의
					<br /> 카테고리를 알려주세요!🎧
				</h2>
				<input
					className="bg-input rounded-[10px] w-[88%] h-20 self-center p-4 text-2xl"
					type="text"
					name=""
					id=""
					placeholder="카테고리를 알려주세요!"
				/>
				<CategoryGrid />
				<HiOutlineChevronDown className="w-full absolute bottom-32 text-4xl" />
				<Button name="다음" onClick={() => onMoveToFocus(focusLast)} />
			</article>
			<article ref={focusLast} className="flex flex-col relative h-full justify-around items-start gap-5 pb-20 pt-10">
				<header className="w-full absolute my-1 top-0 h-20 flex items-center justify-center text-3xl font-bold">
					<AiOutlineLeft
						className="absolute left-0 top-0 w-20 h-20 p-4 cursor-pointer"
						onClick={() => onMoveToFocus(focusSecond)}
					/>
					뮤직방 생성
				</header>
				<div className="w-80 h-80 m-6 relative rounded-[40px] shadow-2xl shadow-slate-700 overflow-hidden self-center">
					<Image src="/assets/sample.png" fill alt="이미지" />
				</div>
				<article className="flex flex-col w-full gap-4">
					<h2 className="text-3xl font-bold ml-10 p-2">공개 여부를 결정해주세요! ✍️</h2>
					<div className="bg-input rounded-[10px] w-[88%] h-20 self-center p-4 text-2xl flex justify-center items-center font-bold">
						전체 공개
					</div>
					<div className="bg-input rounded-[10px] w-[88%] h-20 self-center p-4 text-2xl flex justify-center items-center font-bold">
						친구 공개
					</div>
					<div className="bg-input rounded-[10px] w-[88%] h-20 self-center p-4 text-2xl flex justify-center items-center font-bold">
						비공개
					</div>
					<p className="text-xl text-zinc-300 font-semibold p-2 w-[88%] self-center">
						💡 모든 사람들에게 공개되는 방이에요! <br />
						<span className="text-white">___</span> 인기 방 순위에 올라갈 수도 있답니다!
					</p>
				</article>
				<Button name="다음" link="room/create/success" />
			</article>
		</>
	);
}
