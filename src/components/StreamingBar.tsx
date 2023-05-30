import { HiPlay, HiOutlineShare, HiOutlineUsers, HiOutlinePencilAlt, HiOutlineAdjustments } from 'react-icons/hi';
import RoundedButton from './RoundedButton';

export default function StreamingBar() {
	return (
		<article className="w-full h-40 flex items-center justify-center gap-5">
			<div className="bg-primary w-44 h-20 text-white rounded-full flex gap-3 justify-center items-center">
				<HiPlay className="text-4xl" />
				<span className="text-2xl font-semibold">요청</span>
			</div>
			<HiOutlineUsers className="text-5xl" />
			<HiOutlineShare className="text-5xl" />
			{/* <HiOutlinePencilAlt className="text-5xl" /> */}
			{/* <HiOutlineAdjustments className="text-5xl" /> */}
		</article>
	);
}
