import { RiCloudFill } from 'react-icons/ri';

export default function ChattingBar() {
	const emoji = ['👏', '💪', '🔥', '❤️', '🤩'];
	return (
		<article className="flex flex-col gap-2 w-full h-44 px-10 absolute bottom-8">
			<ul className="flex justify-evenly items-center h-20">
				{emoji.map((item) => (
					<li className="text-4xl p-5" key={item}>
						{item}
					</li>
				))}
			</ul>
			<form className="bg-zinc-200 flex justify-between items-center overflow-hidden h-20 rounded-[28px]">
				<input
					className="w-full pl-10 text-2xl text-zinc-400 bg-zinc-200"
					placeholder="구름 채팅 띄우기..."
					type="text"
				/>
				<RiCloudFill className="text-6xl text-primary m-7 p-0.5" />
			</form>
		</article>
	);
}
