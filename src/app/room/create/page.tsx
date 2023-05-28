import { HiOutlineChevronDown } from 'react-icons/hi';
import Button from '@/components/Button';
import MusicRecord from '@/components/MusicRecord';
import TitleHeader from '@/components/TitleHeader';

export default function CreateRoomPage() {
	return (
		<section className="">
			<TitleHeader title="뮤직방 생성" previous />
			<MusicRecord image="/assets/sample.png" />
			<article className="flex flex-col justify-center items-start gap-5">
				<h2 className="text-3xl font-bold ml-10 p-2">
					당신의 플레이리스트의
					<br /> 이름을 정해주세요!🔥
				</h2>
				<input
					className="bg-input rounded-[10px] w-[88%] h-20 self-center p-4 text-2xl"
					type="text"
					name=""
					id=""
					placeholder="음악 방의 이름을 입력해주세요!"
				/>
				<HiOutlineChevronDown className="w-full absolute bottom-32 text-4xl" />
				<Button name="다음" />
			</article>
		</section>
	);
}
