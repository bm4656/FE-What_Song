const skeleton = [1, 2, 3, 4, 5];

export default function StoriesLoader() {
	return (
		<section className="w-full shadow-sm flex justify-around px-4 shadow-neutral-300 mb-5 pb-3 rounded-lg min-h-[90px] overflow-x-auto">
			{skeleton.map((i) => (
				<div className="flex flex-col items-center justify-center" key={i}>
					<div className="w-[80px] h-[80px] bg-gray-200 rounded-full mb-3 animate-pulse" />
					<p className="text-xl bg-gray-200 w-28 h-6 rounded-md animate-pulse" />
				</div>
			))}
		</section>
	);
}
