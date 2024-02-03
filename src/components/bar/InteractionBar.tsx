'use client';

import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import InteractionView from '../InteractionView';

export default function InteractionBar() {
	const emoji = ['👏', '💪', '🔥', '❤️', '🤩'];
	// 인터랙션 상태
	const [interaction, setInteraction] = useState(false);
	// 이모지 버튼 클릭 시 인터랙션 2.3초 동안 화면에 동작
	const handleButton = () => {
		setInteraction(true);
		setTimeout(() => {
			setInteraction(false);
		}, 2300);
	};
	return (
		<article className="flex flex-col gap-2 w-full  h-42 px-10 absolute bottom-8">
			{/* 인터랙션 이모지 버튼 */}
			<ul className="flex justify-evenly items-center h-24">
				{/* {emoji.map((item) => (
					<li className="text-4xl p-5 w-24" key={item}>
						<button onClick={handleButton} value={item}>
							{item}
						</button>
					</li>
				))} */}
			</ul>
			{/* 인터랙션 이모지 반응 */}
			{interaction && <InteractionView emoji="" />}
			<div className="flex justify-end items-center h-20 w-full rounded-sm">
				{/* <FaHandSparkles className="text-6xl text-secondary m-7 p-0.5" />
				<BsFire className="text-6xl text-secondary m-7 p-0.5" /> */}
				<FaHeart className="text-[5rem] text-secondary p-0.5 cursor-pointer animate-bounce" onClick={handleButton} />
			</div>
		</article>
	);
}
