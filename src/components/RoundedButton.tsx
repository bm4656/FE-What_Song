export default function RoundedButton({ name }: { name: string }) {
	return (
		<div className="bg-secondary w-44 h-20 rounded-full flex justify-center items-center">
			<span className="text-white text-2xl font-semibold">{name}</span>
		</div>
	);
}
