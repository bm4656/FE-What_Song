type ColorList = {
	[key: string]: string;
};

export default function RoundedButton({ name, color }: { name: string; color: string }) {
	const colorList: ColorList = {
		blue: 'bg-primary',
		pink: 'bg-secondary',
	};
	return (
		<div className={`${colorList[color]} w-44 h-20 rounded-full flex justify-center items-center`}>
			<span className="text-white text-2xl font-semibold">{name}</span>
		</div>
	);
}
