import { FiSettings } from 'react-icons/fi';
import ProfileBar from './ProfileBar';

export default function ProfileCard() {
	return (
		<section className="w-full h-[30rem]">
			<ProfileBar />
			<div className="flex gap-4 justify-center items-center mt-16">
				<button className="bg-neutral-200 w-[40%] h-16 rounded-xl text-2xl font-semibold">프로필 편집</button>
				<button className="bg-neutral-200 w-[40%] h-16 rounded-xl text-2xl font-semibold">친구 추가</button>
				<button className="bg-neutral-200 w-[10%] h-16 rounded-xl text-3xl font-semibol flex items-center justify-center">
					<FiSettings />
				</button>
			</div>
		</section>
	);
}
