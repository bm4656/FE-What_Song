type Props = {
	type: 'REQUEST' | 'ACCEPT' | 'ADD';
};

// 요청, 수락, 추가 탭에 따라 다른 버튼
export default function PlaylistButton({ type }: Props) {
	const handleButton = async () => {};
	return (
		<button
			onClick={handleButton}
			className={`text-xl rounded-lg font-semibold text-white w-24 h-10 hover:scale-105 ${
				type === 'ACCEPT' ? ' bg-primary' : 'bg-secondary'
			}`}
		>
			{type === 'REQUEST' && '요청'}
			{type === 'ACCEPT' && '수락'}
			{type === 'ADD' && '추가'}
		</button>
	);
}
