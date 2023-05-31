import Image from 'next/image';
import { BsPlayFill } from 'react-icons/bs';

type Props = {
	image: string;
	isHost?: boolean;
};

export default function MusicRecord({ image, isHost }: Props) {
	return (
		<article className="relative w-full h-[38rem] flex justify-center items-center">
			{isHost && (
				<span className="bg-white w-16 h-16 rounded-full flex items-center justify-center z-20 scale-105">
					<BsPlayFill className="w-14 h-14 p-0.5 ml-1" />
				</span>
			)}
			<div className="bg-zinc-900 absolute right-44 max-[490px]:right-24 w-80 h-80 rounded-full z-0" />
			<div className="w-80 h-96 absolute rounded-[40px] shadow-2xl shadow-slate-700 overflow-hidden z-10">
				<Image src={image} alt="이미지" fill />
			</div>
		</article>
	);
}
