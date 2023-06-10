import MusicBarCard from './card/MusicBarCard';

const data = [
	{ id: 1, musicName: 'Senorita', singer: 'Shawn Mendes' },
	{ id: 2, musicName: 'Spicy', singer: 'aespa' },
	{ id: 3, musicName: 'Cupid', singer: 'fifty fifty' },
];

export default function MusicBarLIst() {
	return (
		<ul className="flex flex-col gap-4">
			{data.map((item) => (
				<MusicBarCard music={item} key={item.id} />
			))}
		</ul>
	);
}
