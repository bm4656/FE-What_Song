import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';

type Props = {
	music: {
		id: number;
		musicName: string;
		singer: string;
	};
};
export default function MusicBarCard({ music }: Props) {
	return (
		<li className="w-full h-28 relative flex items-center">
			<div className="absolute w-[6.5rem] h-[6.5rem] p-4">
				<Image
					src="/assets/sample.png"
					alt="앨범커버"
					fill
					style={{ objectFit: 'cover' }}
					className="rounded-[1.5rem] shadow-md shadow-zinc-400"
				/>
			</div>
			<h2 className="absolute left-36 top-7 text-3xl font-bold">{music.musicName}</h2>
			<p className="absolute left-36 top-16 text-xl text-zinc-400 font-semibold">{music.singer}</p>
			<button className="absolute right-10 text-3xl">
				<FaTrashAlt />
			</button>
		</li>
	);
}
