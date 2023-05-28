import Image from 'next/image';

type Props = {
	image: string;
};

export default function MusicRecord({ image }: Props) {
	return (
		<article className="relative w-full h-[38rem] flex justify-center items-center">
			<div className="bg-zinc-900 absolute right-44 max-[490px]:right-24 w-80 h-80 rounded-full" />
			<div className="w-80 h-96 absolute rounded-[40px] shadow-2xl shadow-slate-700 overflow-hidden">
				<Image src={image} alt="이미지" fill />
			</div>
		</article>
	);
}
