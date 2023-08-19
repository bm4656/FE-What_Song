import Image from 'next/image';
import { BsPlayFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import Link from 'next/link';
import { useState } from 'react';
import { Room } from '@/app/service/room';
import MusicDeleteModal from '../MusicDeleteModal';

type Props = {
	musicRoom: Room;
	isHostCard?: boolean;
};

export default function MusicRoomCard({
	musicRoom: {
		extraInfo: { hostName, view },
		have: { roomName, musicRoomSeq },
	},
	isHostCard,
}: Props) {
	const [modal, setModal] = useState(false);
	return (
		<article className="m-4 rounded-[40px] shadow-md shadow-zinc-700 overflow-hidden relative w-[30rem] h-[30rem] hover:scale-95">
			<Link href={`room/${musicRoomSeq}`}>
				<div className="w-1/2 h-1/2">
					<Image
						src="https://i.pinimg.com/originals/af/99/7b/af997bd9ce063b60705e71b7c21b8198.jpg"
						alt={roomName}
						fill
					/>
				</div>
				<div className="absolute w-[30rem] h-[30rem] bottom-0 left-0 bg-gradient-to-tl from-zinc-900" />
				<h2 className="absolute bottom-32 left-5 text-3xl font-bold text-white p-2 w-4/5">{roomName}</h2>
				<h5 className="absolute bottom-[6.4rem] left-6 text-white p-2">{hostName}</h5>
				<span className="absolute bottom-[1.8rem] left-8 bg-white w-16 h-16 rounded-full flex items-center justify-center">
					<BsPlayFill className="w-14 h-14 p-0.5 ml-1" />
				</span>
				<span className="absolute bottom-[1.8rem] left-28 bg-zinc-300 text-zinc-100 bg-opacity-70 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
					<AiFillEye className="w-8 h-8" />
					<p className="text-xl font-semibold mt-0.5">{view}</p>
				</span>
			</Link>
			{isHostCard && (
				<button className="absolute top-4 right-9" onClick={() => setModal((prev) => !prev)}>
					<CgDetailsMore className="w-10 h-10 text-zinc-100" />
				</button>
			)}
			{modal && <div className="absolute bg-yellow-600 w-30 h-30">삭제하기</div>}
		</article>
	);
}
