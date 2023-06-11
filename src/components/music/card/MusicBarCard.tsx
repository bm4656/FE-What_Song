import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { YoutubeType } from '@/app/service/youtube';

type Props = {
	music: YoutubeType;
};
export default function MusicBarCard({ music }: Props) {
	return (
		<li className="w-full h-28 relative flex items-center">
			<div className="absolute w-[6.5rem] h-[6.5rem] p-4">
				<Image
					src={music.thumbnailUrl}
					alt="앨범커버"
					fill
					style={{ objectFit: 'cover' }}
					className="rounded-[1.5rem] shadow-md shadow-zinc-400"
				/>
			</div>
			<h2 className="absolute left-36 top-7 text-3xl font-bold truncate w-[60%]">{music.title}</h2>
			<p className="absolute left-36 top-16 text-xl text-zinc-400 font-semibold">{music.channelName}</p>
			<button className="absolute right-10 text-3xl">
				<FaTrashAlt className="text-secondary" />
			</button>
		</li>
	);
}
