import Link from 'next/link';
import { Icons } from '../constants/ReactIcons';

type Props = {
	tab: string;
};

export default function Navbar({ tab }: Props) {
	return (
		<nav className="shadow-inner text-zinc-400  bg-white flex justify-around items-center h-28 fixed bottom-0 w-full max-w-[50rem]">
			<Link className="text-xl flex flex-col items-center" href="/home">
				{tab === 'home' ? Icons.homeFill : Icons.home}
				<span className={tab === 'home' ? 'text-primary' : ''}>홈</span>
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/music">
				{tab === 'music' ? Icons.musicFill : Icons.music}
				<span className={tab === 'music' ? 'text-primary' : ''}>뮤직</span>
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/dm">
				{tab === 'dm' ? Icons.dmFill : Icons.dm}
				<span className={tab === 'dm' ? 'text-primary' : ''}>DM</span>
			</Link>
			<Link className="text-xl flex flex-col items-center" href="/profile">
				{tab === 'profile' ? Icons.profileFill : Icons.profile}
				<span className={tab === 'profile' ? 'text-primary' : ''}>프로필</span>
			</Link>
		</nav>
	);
}
