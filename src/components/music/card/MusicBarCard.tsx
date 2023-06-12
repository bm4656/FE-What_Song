import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';
import { YoutubeType } from '@/app/service/youtube';

type Props = {
	music: YoutubeType;
	isList: boolean;
	onAdd: (music: {
		videoId: string;
		title: string;
		channelName: string;
		thumbnailUrl: string;
		roomSeq: number;
	}) => void;
	onDelete?: () => void;
};
export default function MusicBarCard({ music, isList, onAdd, onDelete }: Props) {
	const handleAdd = () => {
		onAdd({ ...music });
	};
	return (
		<li className="flex w-full items-center relative">
			<button onClick={handleAdd} className="w-[87%] h-28  flex items-center  cursor-pointer">
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
			</button>
			<button className="absolute right-10 text-3xl hover:scale-110">
				{isList ? <FaTrashAlt className="text-secondary" /> : <BsMusicNoteList className="text-secondary" />}
			</button>
		</li>
	);
}
