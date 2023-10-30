import { FiSettings } from 'react-icons/fi';
import ProfileBar from './ProfileBar';
import SearchModal from './SearchModal';
import ProfileButton from './ProfileButton';

export default function ProfileCard() {
	return (
		<section className="w-full h-[30rem]">
			<ProfileBar />
			<div className="flex gap-4 justify-center items-center mt-16">
				<ProfileButton addStyle="w-[40%] text-2xl">프로필 편집</ProfileButton>
				<ProfileButton addStyle="w-[40%] text-2xl">친구 추가</ProfileButton>
				<ProfileButton addStyle="w-[10%] text-3xl  flex items-center justify-center">
					<FiSettings />
				</ProfileButton>
			</div>
			<SearchModal />
		</section>
	);
}
