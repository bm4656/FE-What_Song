import Link from 'next/link';
import { AiOutlineHome, AiFillHome, AiOutlineMessage, AiFillMessage } from 'react-icons/ai';
import { BsMusicPlayer, BsFillMusicPlayerFill } from 'react-icons/bs';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';

type Props = {
	tab: string;
};
const icons = {
	home: <AiOutlineHome className="text-4xl" />,
	homeFill: <AiFillHome className="text-4xl m-1 text-primary" />,
	music: <BsMusicPlayer className="text-4xl m-2" />,
	musicFill: <BsFillMusicPlayerFill className="text-4xl m-2" />,
	dm: <AiOutlineMessage className="text-4xl m-2" />,
	dmFill: <AiFillMessage className="text-4xl m-2" />,
	profile: <RiUser3Line className="text-4xl m-2" />,
	profileFill: <RiUser3Fill className="text-4xl m-2" />,
};
export default function Navbar({ tab }: Props) {
	return (
		<nav className="shadow-inner text-zinc-400 flex justify-around items-center h-28 absolute bottom-0 left-0 w-full">
			<Link className="text-xl flex flex-col items-center" href="/home">
				{tab === 'home' ? icons.homeFill : icons.home}
				<span className={tab === 'home' ? 'text-primary' : ''}>홈</span>
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/music">
				{tab === 'music' ? icons.musicFill : icons.music}
				<span className={tab === 'music' ? 'text-primary' : ''}>뮤직</span>
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/dm">
				{tab === 'dm' ? icons.dmFill : icons.dm}
				<span className={tab === 'dm' ? 'text-primary' : ''}>DM</span>
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/profile">
				{tab === 'profile' ? icons.profileFill : icons.profile}
				<span className={tab === 'profile' ? 'text-primary' : ''}>프로필</span>
			</Link>
		</nav>
	);
}
