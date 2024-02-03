import Image from 'next/image';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { YouTubePlayer } from 'react-youtube';

type Props = {
	image: string;
	isHost?: boolean;
	music?: {
		videoId: string;
		title: string;
		channelName: string;
		thumbnailUrl: string;
	};
	playStatus?: string;
	player?: YouTubePlayer;
};

export default function MusicRecord({ image, isHost, music, playStatus, player }: Props) {
	return (
		<article className="w-full h-[40rem] flex justify-center items-center">
			<div className="relative w-[75%] max-[390px]:w-[80%] h-[30rem] flex justify-center items-center">
				{isHost && (
					<span className="bg-white w-16 h-16 rounded-full flex items-center justify-center z-20 scale-105">
						{playStatus === 'PLAYING' ? (
							<BsPauseFill onClick={() => player.pauseVideo()} className="cursor-pointer w-14 h-14 p-0.5 ml" />
						) : (
							<BsPlayFill onClick={() => player.playVideo()} className="cursor-pointer last:w-14 h-14 p-0.5 ml-1" />
						)}
					</span>
				)}
				<div
					className={`absolute right-0 w-[24rem] h-[24rem] rounded-full z-0 bg-gradient-to-r from-indigo-800 via-zinc-900 to-neutral-900 ${
						playStatus === 'PLAYING' && 'animate-spin'
					}`}
				/>
				<div className="w-96 h-[28rem] max-[390px]:scale-95 absolute rounded-[40px] shadow-2xl shadow-slate-700 overflow-hidden z-10">
					<Image src={image} alt="이미지" fill className="object-cover" priority />
				</div>
			</div>
		</article>
	);
}
