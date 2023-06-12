'use client';

import { useRef, useState } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';
import Image from 'next/image';
import { useAtomValue } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/button/Button';
import CategoryGrid from '@/components/music/CategoryGrid';
import TitleHeader from '@/components/TitleHeader';
import MusicRecord from '@/components/music/streaming/MusicRecord';
import PageHeaderContent from '@/components/PageHeaderContent';
import InputBar from '@/components/bar/InputBar';
import { UserInfoAtom } from '@/state/store/login';
import { roomClients } from '@/app/service/room-client';

type createRoom = {
	memberSeq: number | undefined;
	roomName: string;
	category: string;
	accessAuth: string;
};
export default function CreateRoomPage() {
	const userInfo = useAtomValue(UserInfoAtom);
	const { mutate: createMusicRoomMutate } = useMutation(roomClients.createMusicRoom, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => console.log(error),
	});
	// 스크롤 이동
	const focusFirst = useRef<HTMLDivElement>(null);
	const focusSecond = useRef<HTMLDivElement>(null);
	const focusLast = useRef<HTMLDivElement>(null);
	const onMoveToFocus = (focus: React.RefObject<HTMLDivElement>) => {
		focus.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
	// 뮤직 방 생성 폼 데이터
	const [data, setData] = useState<createRoom>({
		memberSeq: 1,
		roomName: '',
		category: '',
		accessAuth: '',
	});
	const handleAceess = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({ ...prev, accessAuth: e.target.value }));
	};
	const onAddRoom = async () => {
		console.log(data);
		if (userInfo?.memberSeq) {
			createMusicRoomMutate({ ...data, memberSeq: userInfo.memberSeq });
		} else createMusicRoomMutate({ ...data });
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
				<InputBar
					placeholder="음악 방의 이름을 입력해주세요!"
					styles="bg-input mb-[10%]"
					value={data.roomName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setData((prev) => ({ ...prev, roomName: e.target.value }));
					}}
				/>
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
				<InputBar
					value={data.category}
					placeholder="카테고리를 알려주세요!"
					styles="bg-input mb-[10%]"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setData((prev) => ({ ...prev, category: e.target.value }));
					}}
				/>
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
				<article className="flex flex-col w-full  py-32">
					<PageHeaderContent content="공개 여부를 결정해주세요! ✍️ " mb="mb-4" />
					<div className="relative text-2xl font-bold">
						<input
							type="radio"
							id="public"
							name="disclosure"
							value="PUBLIC"
							onChange={handleAceess}
							className="bg-input mb-3 rounded-[1rem] w-[98%] h-16 self-center p-4 flex justify-center items-center font-bold appearance-none checked:bg-blue-300"
						/>
						<label htmlFor="public" className="absolute top-5 left-[50%] -translate-x-1/2">
							전체 공개
						</label>
					</div>
					<div className="relative text-2xl font-bold">
						<input
							type="radio"
							id="private"
							name="disclosure"
							value="PRIVATE"
							onChange={handleAceess}
							className="bg-input mb-3 rounded-[1rem] w-[98%] h-16 self-center p-4 flex justify-center items-center font-bold appearance-none checked:bg-blue-300"
						/>
						<label htmlFor="private" className="absolute top-5 left-[50%] -translate-x-1/2">
							친구 공개
						</label>
					</div>
					<div className="relative text-2xl font-bold">
						<input
							type="radio"
							id="non"
							name="disclosure"
							value="NON"
							onChange={handleAceess}
							className="bg-input rounded-[1rem] w-[98%] h-16 self-center p-4 flex justify-center items-center font-bold appearance-none checked:bg-blue-300"
						/>
						<label htmlFor="non" className="absolute top-5 left-[50%] -translate-x-1/2">
							비공개
						</label>
					</div>
					<p className="text-xl text-zinc-300 font-semibold p-2 w-full self-center">
						💡 전체 공개는 모든 사람들에게 공개되는 방이에요! <br />
						<span className="text-white">___</span> 인기 방 순위에 올라갈 수도 있답니다!
					</p>
				</article>
				<HiOutlineChevronUp
					className="absolute bottom-32 text-4xl cursor-pointer flex self-center"
					onClick={() => onMoveToFocus(focusSecond)}
				/>
				<Button content="다음" link="room/create/success" clickFn={onAddRoom} />
			</article>
		</>
	);
}
