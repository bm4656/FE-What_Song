'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';
import { CompatClient } from '@stomp/stompjs';
import IconBox from '../music/streaming/IconBox';
import { Icons } from '@/constants/ReactIcons';
import StreamingModal from '../music/streaming/StreamingModal';
import { modalAtom } from '@/state/store/modal';
import { BottomModal } from '@/types/modal';
import { SimpleUser } from '@/types/user';

const icons = [
	// { name: '참여자', icon: Icons.users, clickFn: '' },
	{ name: '공유', icon: Icons.share, clickFn: 'share' },
	// { name: '변경', icon: Icons.modify, clickFn: 'request' },
	// { name: '수락', icon: Icons.adjustments, clickFn: 'request' },
];

type Props = {
	roomId: string;
	isOwner: boolean;
	memberSeq: number;
	musicSock: CompatClient | any;
	roomCode: string;
	memberList: SimpleUser[];
};

export default function StreamingBar({ roomId, isOwner, memberSeq, musicSock, roomCode, memberList }: Props) {
	const [modalOpen, setModalOpen] = useAtom(modalAtom);
	const [modalType, setModalType] = useState<BottomModal>(`${isOwner ? 'ADD' : 'REQUEST'}`);

	return (
		<article className="w-full h-40 flex items-center justify-center gap-5">
			<ul className="flex gap-10">
				{isOwner ? (
					<>
						{icons.map((icon) => (
							<IconBox key={icon.name} name={icon.name} clickFn={`/room/${roomId}/${icon.clickFn}`}>
								{icon.icon}
							</IconBox>
						))}
						<button
							className="flex flex-col justify-center items-center cursor-pointer"
							onClick={() => {
								setModalOpen((prev) => !prev);
								setModalType('USERS');
							}}
						>
							<div className="text-5xl">{Icons.users}</div>
							<span className="text-xl text-zinc-400 w-full flex justify-center items-center">참여자</span>
						</button>
						<button
							className="flex flex-col justify-center items-center cursor-pointer"
							onClick={() => {
								setModalOpen((prev) => !prev);
								setModalType('ADD');
							}}
						>
							<div className="text-5xl">{Icons.modify}</div>
							<span className="text-xl text-zinc-400 w-full flex justify-center items-center">변경</span>
						</button>
						<button
							className="flex flex-col justify-center items-center cursor-pointer"
							onClick={() => {
								setModalOpen((prev) => !prev);
								setModalType('ACCEPT');
							}}
						>
							<div className="text-5xl">{Icons.adjustments}</div>
							<span className="text-xl text-zinc-400 w-full flex justify-center items-center">수락</span>
						</button>
					</>
				) : (
					<>
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
						<li
							className="bg-primary w-44 h-20 text-white rounded-full flex gap-3 justify-center items-center cursor-pointer"
							onClick={() => {
								setModalOpen((prev) => !prev);
								setModalType('REQUEST');
							}}
						>
							<div className="text-4xl">{Icons.playButton}</div>
							<span className="text-2xl font-semibold">요청</span>
						</li>
						<button
							className="flex flex-col justify-center items-center cursor-pointer"
							onClick={() => {
								setModalOpen((prev) => !prev);
								// setModalType('users');
							}}
						>
							<div className="text-5xl">{Icons.users}</div>
							<span className="text-xl text-zinc-400 w-full flex justify-center items-center">참여자</span>
						</button>
						<IconBox name={icons[0].name} clickFn={icons[0].clickFn}>
							{icons[0].icon}
						</IconBox>
					</>
				)}
			</ul>
			{modalOpen && (
				<StreamingModal
					modalType={modalType}
					musicSock={musicSock}
					roomCode={roomCode}
					memberList={memberList}
					memberSeq={memberSeq}
				/>
			)}
		</article>
	);
}
