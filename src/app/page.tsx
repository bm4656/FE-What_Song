'use client';

import { atom, useAtom } from 'jotai';
import { darkModeAtom } from '@/app/store';

const countAtom = atom(0);

export default function Home() {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	const [count, setCount] = useAtom(countAtom);

	return (
		<div className={`w-screen h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
			<div>
				<h1>현재 {darkMode ? '다크' : '라이트'} 모드!</h1>
				<button onClick={() => setDarkMode(!darkMode)}>테마 변경</button>
			</div>
			<div>
				<h1>카운트: {count}</h1>
				<button onClick={() => setCount(count + 1)}>카운트 증가</button>
			</div>
		</div>
	);
}
