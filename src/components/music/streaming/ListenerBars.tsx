import UserCard from '@/components/profile/UserCard';
import { SimpleUser } from '@/types/user';

type Props = {
	memberSeq: number;
	memberList: SimpleUser[];
};

export default function ListenerBars({ memberList, memberSeq }: Props) {
	return (
		<ul className="flex flex-col max-h-[40rem] overflow-y-scroll">
			{memberList &&
				memberList.map((member, index) => (
					<li key={index}>
						<UserCard user={member} ownerSeq={memberSeq} />
					</li>
				))}
		</ul>
	);
}
