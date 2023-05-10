'use client';

import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

export default function Home() {
	const [count, setCount] = useAtom(countAtom);
	return (
		<div>
			<h1>Count: {count}</h1>
			<button onClick={() => setCount(count + 1)}>Increase count</button>
		</div>
	);
}
