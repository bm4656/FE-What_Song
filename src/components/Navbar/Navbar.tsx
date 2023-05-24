import Link from 'next/link';
import { AiOutlineHome, AiFillHome, AiOutlineMessage, AiFillMessage } from 'react-icons/ai';
import { BsMusicPlayer, BsFillMusicPlayerFill } from 'react-icons/bs';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';

type Props = {
	tab: string;
};

export default function Navbar({ tab }: Props) {
	return (
		<nav className="shadow-inner text-[#484C52] flex justify-around items-center h-40 absolute bottom-0 w-full">
			<Link className="text-xl flex flex-col items-center" href="/home">
				{tab === 'home' ? <AiFillHome className="text-4xl" /> : <AiOutlineHome className="text-4xl" />}홈
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/music">
				{tab === 'music' ? (
					<BsFillMusicPlayerFill className="text-4xl m-1" />
				) : (
					<BsMusicPlayer className="text-4xl m-1" />
				)}
				뮤직
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/dm">
				{tab === 'dm' ? <AiFillMessage className="text-4xl m-1" /> : <AiOutlineMessage className="text-4xl m-1" />}
				DM
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/profile">
				{tab === 'profile' ? <RiUser3Fill className="text-4xl m-1" /> : <RiUser3Line className="text-4xl m-1" />}
				프로필
			</Link>
		</nav>
	);
}
