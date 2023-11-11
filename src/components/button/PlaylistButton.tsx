import { MusicBar } from '@/types/modal';

type Props = {
	type: MusicBar;
};

// 요청, 수락, 추가 탭에 따라 다른 버튼
// 핸들링은
export default function PlaylistButton({ type }: Props) {
	return (
		<div
			className={`flex items-center justify-center text-xl rounded-lg font-semibold text-white w-24 h-10 hover:scale-105 ${
				type === 'ACCEPT' ? ' bg-primary' : 'bg-secondary'
			}`}
		>
			{type === 'REQUEST' && '요청'}
			{type === 'ACCEPT' && '수락'}
			{type === 'ADD' && '추가'}
		</div>
	);
}
