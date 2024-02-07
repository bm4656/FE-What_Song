'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TitleHeader from '@/components/TitleHeader';
import PostGrid from '@/components/profile/PostGrid';
import ProfileCard from '@/components/profile/ProfileCard';
import useUser from '@/hooks/useUser';
import { SERVICE_URL } from '@/constants/ServiceUrl';

export default function ProfilePage() {
	const router = useRouter();
	const user = useUser().data;
	useEffect(() => {
		if (!user) router.push(`${SERVICE_URL.login}`);
	}, [user]);

	return (
		<>
			<TitleHeader title="프로필" />
			{user && <ProfileCard user={user} />}
			<PostGrid />
		</>
	);
}
