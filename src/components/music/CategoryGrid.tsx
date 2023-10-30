import { useState } from 'react';
import RoundedButton from '../button/RoundedButton';

const categories = ['K-POP', 'POP', 'J-POP', '힙합', '공부', '잔잔'];

export default function CategoryGrid({ clickFn }: { clickFn: (item: string) => void }) {
	// 선택된 카테고리의 인덱스를 상태로 관리
	const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0]);

	return (
		<div className="flex self-center m-5">
			<ul className="grid grid-cols-3 gap-10">
				{categories.map((item) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
					<li
						key={item}
						onClick={() => {
							// 현재 클릭한 카테고리가 이미 선택된 카테고리와 다를 경우에만 선택 상태 업데이트
							if (selectedCategory !== item) {
								setSelectedCategory(item);
								clickFn(item);
							}
						}}
					>
						<RoundedButton name={item} color={selectedCategory === item ? 'pink' : 'gray'} />
					</li>
				))}
			</ul>
		</div>
	);
}
