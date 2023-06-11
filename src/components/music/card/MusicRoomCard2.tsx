import Image from 'next/image';
import { BsPlayFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import Link from 'next/link';
import { Room } from '@/app/service/room';

type Props = {
	musicRoom: Room;
};

export default function MusicRoomCard2({
	musicRoom: {
		roomName,
		extraInfo: { hostName, view },
		musicRoomSeq,
	},
}: Props) {
	return (
		<li className="m-4 flex rounded-[20px] shadow-md shadow-zinc-300 overflow-hidden relative w-[22.5rem] hover:shadow-primary h-[28rem] max-[490px]:scale-[0.8] max-[490px]:-translate-x-4 max-[490px]:m-0 max-[360px]:scale-[0.75] max-[360px]:-translate-x-9">
			<Link href={`/room/${musicRoomSeq}`}>
				<div className="absolute w-80 h-80 left-4">
					<Image
						src=""
						alt={roomName}
						fill
						style={{ objectFit: 'cover' }}
						className="rounded-[40px] shadow-md shadow-zinc-400"
					/>
					<div className="absolute w-full h-full rounded-[40px] bg-gradient-to-tl from-zinc-800" />
				</div>
				<div className="absolute bottom-16 left-5 text-2xl font-bold p-2 w-4/5 flex justify-center items-center">
					<h2 className="truncate">{roomName}</h2>
				</div>
				<h5 className="absolute bottom-4 left-6 p-2 text-xl text-neutral-400 font-bold">{hostName}</h5>
				<span className="absolute bottom-[9.7rem] left-11 bg-white shadow-lg w-14 h-14 rounded-full flex items-center justify-center">
					<BsPlayFill className="w-14 h-14 p-0.5 ml-1" />
				</span>
				<span className="absolute bottom-2 right-3 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
					<AiFillEye className="w-8 h-8" />
					<p className="text-xl font-semibold mt-0.5">{view}</p>
				</span>
			</Link>
		</li>
	);
}
