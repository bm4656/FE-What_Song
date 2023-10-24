import React, { useState, useEffect } from 'react';

export default function Progressbar({ duration, active }: any) {
	const [filled, setFilled] = useState(0);

	useEffect(() => {
		const startTime = Date.now();

		const updateProgress = () => {
			const currentTime = Date.now();
			const elapsedTime = currentTime - startTime;
			if (elapsedTime < duration && active) {
				const progress = (elapsedTime / duration) * 100;
				setFilled(progress);
				requestAnimationFrame(updateProgress);
			}
		};
		if (active) {
			requestAnimationFrame(updateProgress);
		}

		return () => {
			// Clean up when the component unmounts
		};
	}, [duration, active]);

	return (
		<div
			style={{
				position: 'relative',
				overflow: 'hidden',
				width: 350,
				height: 25,
				borderRadius: 5,
				backgroundColor: '#eee',
			}}
		>
			<div
				style={{
					height: '100%',
					width: `${filled}%`,
					backgroundColor: '#a66cff',
				}}
			/>
		</div>
	);
}
