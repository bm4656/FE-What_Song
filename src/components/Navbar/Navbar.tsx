import Link from 'next/link';
import { AiOutlineHome, AiFillHome, AiOutlineMessage, AiFillMessage } from 'react-icons/ai';
import { BsMusicPlayer, BsFillMusicPlayerFill } from 'react-icons/bs';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';

type Props = {
	tab: string;
};

export default function Navbar({ tab }: Props) {
	return (
		<nav className="shadow-inner text-fontGray flex justify-around items-center h-40 absolute bottom-0 left-0 w-full">
			<Link className="text-xl flex flex-col items-center" href="/home">
				{tab === 'home' ? <AiFillHome className="text-4xl m-1 text-primary" /> : <AiOutlineHome className="text-4xl" />}
				홈
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/music">
				{tab === 'music' ? (
					<BsFillMusicPlayerFill className="text-4xl m-2" />
				) : (
					<BsMusicPlayer className="text-4xl m-2" />
				)}
				뮤직
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/dm">
				{tab === 'dm' ? <AiFillMessage className="text-4xl m-2" /> : <AiOutlineMessage className="text-4xl m-2" />}
				DM
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/profile">
				{tab === 'profile' ? <RiUser3Fill className="text-4xl m-2" /> : <RiUser3Line className="text-4xl m-2" />}
				프로필
			</Link>
		</nav>
	);
}
