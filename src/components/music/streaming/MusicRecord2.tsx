import Image from 'next/image';
import { BsPlayFill } from 'react-icons/bs';

type Props = {
	isHost?: boolean;
	music: {
		videoId: string;
		title: string;
		channelName: string;
		thumbnailUrl: string;
	};
	id: number;
};

export default function MusicRecord2({ isHost, music, id }: Props) {
	return (
		<>
			<article className="relative w-full h-[38rem] flex justify-center items-center">
				{/* {isHost && (
					<span className="bg-white w-16 h-16 rounded-full flex items-center justify-center z-20 scale-105">
						<BsPlayFill className="w-14 h-14 p-0.5 ml-1" />
					</span>
				)} */}
				<div className="bg-zinc-900 absolute right-44 max-[490px]:right-24 w-80 h-80 rounded-full z-0" />
				<div className="w-80 h-96 absolute rounded-[40px] shadow-2xl shadow-slate-700 overflow-hidden z-10">
					{/* <Image src={music.thumbnailUrl} alt="이미지" fill /> */}
					<iframe
						id="player"
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${music.videoId}`}
						frameBorder="0"
						title={music.title}
					/>
				</div>
			</article>
			<div className="flex flex-col justify-center items-center p-2 w-full">
				<h2 className="text-4xl font-bold">{music.title}</h2>
				<p className="text-3xl font-semibold text-zinc-400">{music.channelName}</p>
			</div>
		</>
	);
}
