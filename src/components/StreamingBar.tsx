import { HiPlay, HiOutlineShare, HiOutlineUsers, HiOutlinePencilAlt, HiOutlineAdjustments } from 'react-icons/hi';
import IconBox from './IconBox';

const icons = [
	{ name: '참여자', icon: <HiOutlineUsers /> },
	{ name: '공유', icon: <HiOutlineShare /> },
	{ name: '변경', icon: <HiOutlinePencilAlt /> },
	{ name: '수락', icon: <HiOutlineAdjustments /> },
];

export default function StreamingBar({ isHost }: { isHost: boolean }) {
	return (
		<article className="w-full h-40 flex items-center justify-center gap-5">
			<ul className="flex gap-10">
				{isHost ? (
					<>
						{icons.map((icon) => (
							<IconBox name={icon.name} key={icon.name}>
								{icon.icon}
							</IconBox>
						))}
					</>
				) : (
					<>
						<li className="bg-primary w-44 h-20 text-white rounded-full flex gap-3 justify-center items-center">
							<HiPlay className="text-4xl" />
							<span className="text-2xl font-semibold">요청</span>
						</li>
						<IconBox name={icons[0].name}>{icons[0].icon}</IconBox>
						<IconBox name={icons[1].name}>{icons[1].icon}</IconBox>
					</>
				)}
			</ul>
		</article>
	);
}
