import Link from 'next/link';
import { AiOutlineHome, AiFillHome, AiOutlineMessage, AiFillMessage, AiOutlineUser } from 'react-icons/ai';
import { BsMusicPlayer, BsFillMusicPlayerFill } from 'react-icons/bs';

export default function Navbar() {
	return (
		<nav className="shadow-inner text-[#484C52] flex justify-around items-center h-40 absolute bottom-0 w-full">
			<Link className="text-xl flex flex-col items-center" href="/home">
				<AiFillHome className="text-4xl" />홈
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/music">
				<BsMusicPlayer className="text-4xl m-1" />
				뮤직
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/dm">
				<AiOutlineMessage className="text-4xl m-1" />
				DM
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/profile">
				<AiOutlineUser className="text-4xl m-1" />
				프로필
			</Link>
		</nav>
	);
}
