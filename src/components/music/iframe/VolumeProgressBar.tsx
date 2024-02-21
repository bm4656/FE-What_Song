'use client';

import { useState } from 'react';
import { FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { YouTubePlayer } from 'react-youtube';

export default function VolumeProgressBar({ player }: { player?: YouTubePlayer }) {
	const [volume, setVolume] = useState<number>(30);
	const [toggle, setToggle] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number(event.target.value);
		setVolume(newVolume);
	};
	const handleMouseTouch = () => {
		player.setVolume(volume);
	};
	return (
		<div className="flex items-center justify-center relative">
			{toggle && (
				<input
					onChange={handleChange}
					onMouseUp={handleMouseTouch}
					onTouchEnd={handleMouseTouch}
					type="range"
					min="0"
					max="100"
					value={volume}
					disabled={!player}
					style={{
						background: `linear-gradient(to right, #95BFFF 0%, #95BFFF ${volume}%, #d5d4d3 ${volume}%, #d5d4d3 100%)`,
						width: '6rem',
						transform: 'translate(0, -50%) rotate(-90deg)',
						position: 'absolute',
						top: '-220%',
					}}
				/>
			)}
			<button className="text-3xl mr-1 cursor-pointer" onClick={() => setToggle((prev) => !prev)}>
				{volume !== 0 ? <FaVolumeDown /> : <FaVolumeMute />}
			</button>
		</div>
	);
}
