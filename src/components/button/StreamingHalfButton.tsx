import { BottomModal } from '@/types/modal';

type Props = {
	left: { name: string; icon: JSX.Element; type: BottomModal };
	right: { name: string; icon: JSX.Element; type: BottomModal };
	onIcon: (type: BottomModal) => void;
};

export default function StreamingHalfButton({ left, right, onIcon }: Props) {
	return (
		<div className="bg-primary w-[15rem] h-20 text-white rounded-full flex gap-3 justify-center items-center cursor-pointer">
			<button onClick={() => onIcon(left.type)} className="flex gap-2 items-center">
				<div className="text-4xl">{left.icon}</div>
				<span className="text-2xl font-semibold">{left.name}</span>
			</button>
			<div className="bg-white w-[0.15rem] h-14" />
			<button onClick={() => onIcon(right.type)} className="flex gap-2 items-center">
				<div className="text-4xl">{right.icon}</div>
				<span className="text-2xl font-semibold">{right.name}</span>
			</button>
		</div>
	);
}
