'use client';

import { useEffect, useRef } from 'react';

export default function page() {
	const target = useRef<HTMLDivElement>(null);
	const callback = () => {
		if (target.current) {
			target.current.innerText += '관측되었습니다';
		}
	};
	const options = {
		threshold: 1.0,
	};

	useEffect(() => {
		if (target.current) {
			const observer = new IntersectionObserver(callback, options);
			observer.observe(target.current);
		}
	}, []);

	return (
		<>
			<div className="w-full h-[300vh] bg-yellow-200" />

			<div className="h-24 bg-teal-400" ref={target}>
				target
			</div>
		</>
	);
}
