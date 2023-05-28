type Props = {
	name: string;
};
export default function Button({ name }: Props) {
	return (
		<div className="w-full absolute bottom-10 flex justify-center items-center">
			<button className="w-[88%] h-20 bg-primary rounded-[10px] text-white text-2xl font-bold">{name}</button>;
		</div>
	);
}
