import Image from 'next/image';

export default function ProfileBar() {
	return (
		<article className="flex w-full relative h-[15rem]">
			<div className="absolute w-40 h-60 p-4 left-10 top-6">
				<div className="absolute w-32 h-32">
					<Image
						src="/assets/cat-music.jpeg"
						alt="avatar"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						style={{ objectFit: 'cover' }}
						className="rounded-full"
					/>
				</div>
				<p className="absolute bottom-10 left-4 text-2xl font-semibold">이름</p>
				<p className="absolute bottom-4 left-4 text-xl text-zinc-400">이메일</p>
			</div>
			<div className="flex gap-12 absolute right-32 top-20">
				<div className="flex-col justify-center">
					<p className="text-2xl">팔로워</p>
					<p className="text-2xl font-semibold text-center">00</p>
				</div>
				<div className="flex-col justify-center">
					<p className="text-2xl">팔로잉</p>
					<p className="text-2xl font-semibold text-center">00</p>
				</div>
			</div>
		</article>
	);
}
