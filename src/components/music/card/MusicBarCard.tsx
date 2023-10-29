import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';
import { ResVideo, Video } from '@/types/video';

type Props = {
	music: ResVideo & { roomSeq: number };
	barType: string;
	onAdd: (music: ResVideo, addType: string) => void;
	onDelete?: () => void;
};
export default function MusicBarCard({ music, barType, onAdd, onDelete }: Props) {
	const handleRequest = () => {
		onAdd({ ...music }, barType);
	};
	return (
		<li className="flex w-full items-center justify-center  relative">
			<button className="w-[87%] h-28 px-2 flex items-center cursor-pointer">
				<div className="absolute w-[6.5rem] h-[6.5rem] p-4">
					<Image
						src={music.thumbnailUrl}
						alt="앨범커버"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						style={{ objectFit: 'cover' }}
						className="rounded-[1.5rem] shadow-md shadow-zinc-400"
					/>
				</div>
				<h2 className="absolute left-[11.5rem] top-7 text-3xl font-bold truncate w-[60%] text-start">{music.title}</h2>
				<p className="absolute left-[11.5rem] top-16 text-xl text-zinc-400 font-semibold">{music.channelName}</p>
			</button>
			<button className="absolute right-14 text-3xl hover:scale-110" onClick={handleRequest}>
				{barType === 'host' ? (
					<BsMusicNoteList className="text-secondary" />
				) : (
					<BsMusicNoteList className="text-secondary" />
				)}
				{/* {barType === 'modify' && <FaTrashAlt className="text-secondary" />} */}
			</button>
		</li>
	);
}
