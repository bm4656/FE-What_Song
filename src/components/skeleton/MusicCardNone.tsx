import Image from 'next/image';
import Link from 'next/link';
import ReactCarousel from '../music/ReactCarousel';

export default function MusicCardNone({ type }: { type: string }) {
	return (
		<ReactCarousel>
			<article className="m-4 rounded-[40px] shadow-md shadow-zinc-700 overflow-hidden relative w-[30rem] h-[30rem] hover:scale-95">
				<Link href="room/create">
					<div className="w-1/2 h-1/2">
						<Image src="/assets/cat-music.jpeg" alt="make" fill />
					</div>
					<div className="absolute w-[30rem] h-[30rem] bottom-0 left-0 bg-gradient-to-tl from-zinc-900" />
					<h2 className="absolute bottom-32 left-5 text-3xl font-bold text-white p-2 w-4/5">
						{type === 'user' ? '아직 생성한 방이 없어요...🥺' : '어? 아직 아무방도 없나봐요..🥹'}
					</h2>
					<h5 className="absolute bottom-[6.4rem] left-6 text-white p-2">눌러서 새로운 방을 만들어봐요!☺️</h5>
					<span className="absolute bottom-[1.8rem] left-8 bg-white w-16 h-16 rounded-full flex items-center justify-center" />
					<span className="absolute bottom-[1.8rem] left-28 bg-zinc-300 text-zinc-100 bg-opacity-70 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
						<p className="text-xl font-semibold mt-0.5" />
					</span>
				</Link>
			</article>
			<article className="m-4 rounded-[40px] shadow-md shadow-zinc-700 overflow-hidden relative w-[30rem] h-[30rem] hover:scale-95">
				<Link href="room/create">
					<div className="w-1/2 h-1/2">
						<Image src="/assets/cat-music.jpeg" alt="make" fill />
					</div>
					<div className="absolute w-[30rem] h-[30rem] bottom-0 left-0 bg-gradient-to-tl from-zinc-900" />
					<h2 className="absolute bottom-32 left-5 text-3xl font-bold text-white p-2 w-4/5">
						{type === 'user' ? '아직 생성한 방이 없어요...🥺' : '어? 아직 아무방도 없나봐요..🥹'}
					</h2>
					<h5 className="absolute bottom-[6.4rem] left-6 text-white p-2">눌러서 새로운 방을 만들어봐요!☺️</h5>
					<span className="absolute bottom-[1.8rem] left-8 bg-white w-16 h-16 rounded-full flex items-center justify-center" />
					<span className="absolute bottom-[1.8rem] left-28 bg-zinc-300 text-zinc-100 bg-opacity-70 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
						<p className="text-xl font-semibold mt-0.5" />
					</span>
				</Link>
			</article>
			<article className="m-4 rounded-[40px] shadow-md shadow-zinc-700 overflow-hidden relative w-[30rem] h-[30rem] hover:scale-95">
				<Link href="room/create">
					<div className="w-1/2 h-1/2">
						<Image src="/assets/cat-music.jpeg" alt="make" fill />
					</div>
					<div className="absolute w-[30rem] h-[30rem] bottom-0 left-0 bg-gradient-to-tl from-zinc-900" />
					<h2 className="absolute bottom-32 left-5 text-3xl font-bold text-white p-2 w-4/5">
						{type === 'user' ? '아직 생성한 방이 없어요...🥺' : '어? 아직 아무방도 없나봐요..🥹'}
					</h2>
					<h5 className="absolute bottom-[6.4rem] left-6 text-white p-2">눌러서 새로운 방을 만들어봐요!☺️</h5>
					<span className="absolute bottom-[1.8rem] left-8 bg-white w-16 h-16 rounded-full flex items-center justify-center" />
					<span className="absolute bottom-[1.8rem] left-28 bg-zinc-300 text-zinc-100 bg-opacity-70 w-24 h-14 rounded-3xl flex items-center justify-around p-3">
						<p className="text-xl font-semibold mt-0.5" />
					</span>
				</Link>
			</article>
		</ReactCarousel>
	);
}
