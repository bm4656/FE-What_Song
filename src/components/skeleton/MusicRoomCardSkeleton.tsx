import { AiFillEye } from 'react-icons/ai';
import { BsPlayFill } from 'react-icons/bs';

export default function MusicRoomCardSkeleton() {
	return (
		<article className="m-4 rounded-[40px]  overflow-hidden relative w-[30rem] h-[30rem] animate-pulse">
			<div className="absolute w-[30rem] h-[30rem] bottom-0 left-0 bg-neutral-400" />
			<p className="absolute bottom-32 left-5 text-3xl font-bold bg-neutral-200 h-10 w-64 p-2 rounded-md" />
			<p className="absolute bottom-[6.4rem] left-5 bg-neutral-200 w-40 p-2 rounded-md" />
			<span className="absolute bottom-[1.8rem] left-8 bg-white w-16 h-16 rounded-full flex items-center justify-center">
				<BsPlayFill className="w-14 h-14 p-0.5 ml-1" />
			</span>
			<span className="absolute bottom-[1.8rem] left-28 bg-zinc-300 text-zinc-100 bg-opacity-70 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
				<AiFillEye className="w-8 h-8" />
				<p className="text-xl font-semibold mt-0.5 w-4 bg-red-600" />
			</span>
		</article>
	);
}
