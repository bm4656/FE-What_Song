import RoundedButton from './RoundedButton';

const categories = ['K-POP', 'POP', 'J-POP', '힙합', '클래식', '공부', '잔잔', '파티'];

export default function CategoryGrid() {
	return (
		<div className="w-full flex justify-center mt-10">
			<ul className="grid grid-cols-3 gap-5">
				{categories.map((item) => (
					<li key={item}>
						<RoundedButton name={item} />
					</li>
				))}
			</ul>
		</div>
	);
}
