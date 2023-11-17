import TitleHeader from '@/components/TitleHeader';
import PostGrid from '@/components/profile/PostGrid';
import ProfileCard from '@/components/profile/ProfileCard';

export default function ProfilePage() {
	return (
		<>
			<TitleHeader title="프로필" />
			<ProfileCard />
			<PostGrid />
		</>
	);
}
