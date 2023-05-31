export default function IconBox({ name, children }: { name: string; children: React.ReactNode }) {
	return (
		<li className="flex flex-col justify-center items-center">
			<div className="text-5xl">{children}</div>
			<span className="text-xl text-zinc-400 w-full flex justify-center items-center">{name}</span>
		</li>
	);
}
