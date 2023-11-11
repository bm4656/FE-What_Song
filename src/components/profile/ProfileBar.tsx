import Image from 'next/image';
import { RawUser } from '@/types/user';

type Props = {
	user: RawUser;
};

export default function ProfileBar({ user: { nickname, email, imgURL } }: Props) {
	// ImgURL 서버에서 디폴트 넣어줄 수 있는지?
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
				<p className="absolute bottom-10 left-4 text-2xl font-semibold">{nickname}</p>
				<p className="absolute bottom-4 left-4 text-xl text-zinc-400">{email}</p>
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
