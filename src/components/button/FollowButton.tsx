// 필로우 팔로잉 상태에 따라 변하는 팔로우버튼 - 팔로우 상태에서 선택하면 팔로잉된다.

import { useState } from 'react';
import { friendApis } from '@/app/service/friend';

type Props = {
	followed?: boolean;
	ownerSeq: number;
	memberSeq: number;
};

export default function FollowButton({ followed = true, ownerSeq, memberSeq }: Props) {
	const [following, setFollowing] = useState(followed);
	const handleButton = async () => {
		if (following) {
			const res = await friendApis.unFollowFriend({ ownerSeq, targetSeq: memberSeq });
			setFollowing(false);
			return res;
		}
		const res = await friendApis.followFriend({ ownerSeq, targetSeq: memberSeq });
		setFollowing(true);
		return res;
	};
	return (
		<button
			onClick={handleButton}
			className={`absolute right-20 top-[2.6rem] text-xl rounded-lg font-semibold text-white w-24 h-10 hover:scale-105 ${
				following ? ' bg-neutral-400' : 'bg-primary'
			}`}
		>
			{following ? '팔로잉' : '팔로우'}
		</button>
	);
}
