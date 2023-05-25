import MusicRoomCard from './MusicRoomCard';

const data = [
	// {
	// 	title: '방제목',
	// 	host: '닉네임',
	// 	view: 30,
	// 	isOwner: false,
	// 	thumnail: '/assets/sample.png',
	// 	id: 1,
	// },
	{
		title: '지금 날씨에 딱인 playlist',
		host: '날씨의아이',
		view: 38,
		isOwner: false,
		thumnail: 'https://i.ytimg.com/vi/vM8m2iSunfc/mqdefault.jpg',
		id: 2,
	},
	{
		title: '세상에서제일긴제목을가지고싶었던사나이의', //20글자 제한
		host: '사나이',
		view: 30,
		isOwner: true,
		thumnail: 'https://i.ytimg.com/vi/RDCVPAvp-Rc/mqdefault.jpg',
		id: 2,
	},
];

export default function Carousel() {
	return (
		<section className="flex mt-2 ml-2">
			{data.map((room) => (
				<MusicRoomCard musicRoom={room} key={room.id} />
			))}
		</section>
	);
}
