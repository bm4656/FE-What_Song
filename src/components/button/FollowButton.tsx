// 필로우 팔로잉 상태에 따라 변하는 팔로우버튼 - 팔로우 상태에서 선택하면 팔로잉된다.

import { friendApis } from '@/app/service/friend';

type Props = {
	followed?: boolean;
	ownerSeq: number;
	memberSeq: number;
};

export default function FollowButton({ followed = true, ownerSeq, memberSeq }: Props) {
	const handleButton = async () => {
		const res = await friendApis.addFriend({ ownerSeq, targetSeq: memberSeq });
		console.log(res);
		return res;
	};
	return (
		<button
			onClick={handleButton}
			className={`absolute right-20 top-[2.6rem] text-xl rounded-lg font-semibold text-white w-24 h-10 hover:scale-105 ${
				followed ? ' bg-neutral-400' : 'bg-primary'
			}`}
		>
			{followed ? '팔로잉' : '팔로우'}
		</button>
	);
}
