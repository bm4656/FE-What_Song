import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';
import { ResVideo, Video } from '@/types/video';
import { BottomModal } from '@/types/modal';
import PlaylistButton from '@/components/button/PlaylistButton';

type Props = {
	music: ResVideo & { roomSeq: number };
	barType: BottomModal;
	onAdd: (music: ResVideo, addType: string) => void;
	onDelete?: () => void;
};
export default function MusicBarCard({ music, barType, onAdd, onDelete }: Props) {
	const handleRequest = () => {
		onAdd({ ...music }, barType);
	};
	return (
		<li className="flex w-full min-w-full items-center justify-center relative">
			<div className="w-[87%] h-28 px-2 flex items-center cursor-pointer">
				<div className="absolute w-[6rem] h-[6rem] p-4">
					<Image
						src={music.thumbnailUrl}
						alt="앨범커버"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						style={{ objectFit: 'cover' }}
						className="rounded-[1.5rem] shadow-md shadow-zinc-400"
					/>
				</div>
				<h2 className="absolute left-[11.5rem] top-7 text-2xl font-bold truncate w-[50%] max-[400px]:w-[40%] text-start">
					{music.title}
				</h2>
				<p className="absolute left-[11.5rem] top-16 text-xl text-zinc-400 font-semibold">{music.channelName}</p>
				<button className="absolute right-14 text-3xl hover:scale-110" onClick={handleRequest}>
					{barType !== 'ACCEPT' && <PlaylistButton type={barType} />}
				</button>
			</div>
		</li>
	);
}
