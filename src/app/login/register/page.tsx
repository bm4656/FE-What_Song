'use client';

import { useSearchParams } from 'next/navigation';
import NicknameInputPage from '@/components/register/NicknameInputPage';
import CompletePage from '@/components/register/CompletePage';

export default function RegisterPage() {
	const searchParams = useSearchParams();
	const page = searchParams.get('page');

	return (
		<>
			{page === '1' && <NicknameInputPage />}
			{page === '2' && <CompletePage />}
		</>
	);
}
