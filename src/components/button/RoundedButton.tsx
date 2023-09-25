type ColorList = {
	[key: string]: string;
};

export default function RoundedButton({ name, color }: { name: string; color: string }) {
	const colorList: ColorList = {
		blue: 'bg-primary',
		pink: 'bg-secondary',
		pick: 'bg-amber-200',
	};
	return (
		<div className={`${colorList[color]} w-44 h-20 rounded-full flex justify-center items-center cursor-pointer bg-`}>
			<span className="text-white text-2xl font-semibold">{name}</span>
		</div>
	);
}
