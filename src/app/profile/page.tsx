'use client';

import TitleHeader from '@/components/TitleHeader';
import PostGrid from '@/components/profile/PostGrid';
import ProfileCard from '@/components/profile/ProfileCard';
import useUser from '@/hooks/useUser';

export default function ProfilePage() {
	const { data, isLoading } = useUser();

	if (isLoading) return null;

	return (
		<>
			<TitleHeader title="프로필" />
			{data && <ProfileCard user={data} />}
			<PostGrid />
		</>
	);
}
