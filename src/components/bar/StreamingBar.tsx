'use client';

import { useAtom } from 'jotai';
import { useState } from 'react';
import { CompatClient } from '@stomp/stompjs';
import StreamingModal from '../music/streaming/StreamingModal';
import { modalAtom } from '@/state/store/modal';
import { BottomModal } from '@/types/modal';
import { SimpleUser } from '@/types/user';
import StreamingButton from '../button/StreamingButton';
import StreamingHalfButton from '../button/StreamingHalfButton';
import { hostIconsFirst, hostIconsLast, userIcons } from '@/constants/Icon/streamingIcon';

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

	const handleIcon = (type: BottomModal) => {
		setModalOpen((prev) => !prev);
		setModalType(type);
	};

	return (
		<article className="w-full h-40 flex items-center justify-center gap-5">
			<ul className="flex gap-10">
				{isOwner ? (
					// 방장 - 스트리밍 관리 탭
					<>
						{hostIconsFirst.map((icon) => (
							<li key={icon.name}>
								<StreamingButton name={icon.name} icon={icon.icon} type={icon.type} onIcon={handleIcon} />
							</li>
						))}
						<StreamingHalfButton left={hostIconsLast[0]} right={hostIconsLast[1]} onIcon={handleIcon} />
					</>
				) : (
					// 일반 - 스트리밍 관리 탭
					<>
						{userIcons.map((icon) => (
							<li key={icon.name}>
								<StreamingButton name={icon.name} icon={icon.icon} type={icon.type} onIcon={handleIcon} />
							</li>
						))}
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
					roomId={roomId}
				/>
			)}
		</article>
	);
}
