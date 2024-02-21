import { BsPlayFill } from 'react-icons/bs';

export default function MusicRecordSkeleton() {
	return (
		<article className="w-full h-[40rem] flex justify-center items-center">
			<div className="relative w-[75%] max-[390px]:w-[80%] h-[30rem] flex justify-center items-center">
				<span className="bg-white w-16 h-16 rounded-full flex items-center justify-center z-20 scale-105">
					<BsPlayFill className="cursor-pointer last:w-14 h-14 p-0.5 ml-1" />
				</span>
				<div className="absolute right-0 w-[24rem] h-[24rem] rounded-full z-0 bg-neutral-700 animate-pulse" />
				<div className="w-96 h-[28rem] bg-neutral-300 max-[390px]:scale-95 absolute rounded-[40px] shadow-2xl shadow-slate-700 overflow-hidden z-10" />
			</div>
		</article>
	);
}
