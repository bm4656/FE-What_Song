'use client';

import useUser from '@/hooks/useUser';

export default function ModalTestPage() {
	const user = useUser();
	const handleRefreshUser = () => {
		console.log(user);
	};
	return (
		<>
			<p>테스트</p>
			<button className="bg-blue-300" onClick={handleRefreshUser}>
				테스트 유저 정보 refresh
			</button>
		</>
	);
}
