'use client';

import { FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { youtubeApis } from '@/app/service/youtube';
import MusicBars from '../music/MusicBars';
import { Video } from '@/types/video';

type Props = {
	placeholder: string;
	searchFn?: (searchResults: Video[]) => void;
	removeFn?: () => void;
};
const data = [
	{
		videoId: 'yIHNas3mKmY',
		title: '페트병으로 요정 만드는법',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/yIHNas3mKmY/hqdefault.jpg',
	},
	{
		videoId: 'IdgVbq7FlIg',
		title: '어둠의 배민으로 들어가는법 발견했습니다',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/IdgVbq7FlIg/hqdefault.jpg',
	},
	{
		videoId: 'RRt9brXUk4c',
		title: '친구 개망한 성우만들기❤',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/RRt9brXUk4c/hqdefault.jpg',
	},
	{
		videoId: 'UFx01K2Q74Y',
		title: '챗GPT 덕분에 데뷔함 (feat.반찬통)',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/UFx01K2Q74Y/hqdefault.jpg',
	},
	{
		videoId: 'PeLl4z9glPs',
		title: '엉덩이로 작은꿈을 그려보자',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/PeLl4z9glPs/hqdefault.jpg',
	},
	{
		videoId: 'yH9NSOzc0EQ',
		title: '도인들의 애프터눈 티세트vlog',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/yH9NSOzc0EQ/hqdefault.jpg',
	},
	{
		videoId: 'laZXagY-ugo',
		title: '미대생 + 쓰레기 = ?',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/laZXagY-ugo/hqdefault.jpg',
	},
	{
		videoId: 'GwfXIjr-BIE',
		title: '병맛 발명소녀 쓰레기걸을 좋아하면 알아야 할 10가지 사실',
		channelName: '이분덕질',
		thumbnailUrl: 'https://i.ytimg.com/vi/GwfXIjr-BIE/hqdefault.jpg',
	},
	{
		videoId: 'AYgC_-PjIbQ',
		title: '선 4개 그리다가 정지당한 작가 #shorts',
		channelName: '공파리파',
		thumbnailUrl: 'https://i.ytimg.com/vi/AYgC_-PjIbQ/hqdefault.jpg',
	},
	{
		videoId: 'oSrAOCCp2T4',
		title: '한끼줍쇼미더머니',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/oSrAOCCp2T4/hqdefault.jpg',
	},
	{
		videoId: 'f2eXZSuzGYg',
		title: '선택지 게임',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/f2eXZSuzGYg/hqdefault.jpg',
	},
	{
		videoId: 'oIMZbk9KaZQ',
		title: '편의점에서 이 과자 발견하면 신고하세요',
		channelName: '발명! 쓰레기걸 Trash girl',
		thumbnailUrl: 'https://i.ytimg.com/vi/oIMZbk9KaZQ/hqdefault.jpg',
	},
	{
		videoId: '5dK9aiPSWY0',
		title: '다음화 예고편',
		channelName: '살아라! 콸콸이',
		thumbnailUrl: 'https://i.ytimg.com/vi/5dK9aiPSWY0/hqdefault.jpg',
	},
	{
		videoId: 'xoo6jmHkw3c',
		title: '도믿걸 vs 쓰레기걸 #Shorts',
		channelName: '강유미 yumi kang좋아서 하는 채널',
		thumbnailUrl: 'https://i.ytimg.com/vi/xoo6jmHkw3c/hqdefault.jpg',
	},
	{
		videoId: 'AuEQgxW3LKk',
		title: '당신의 페이스북, 인스타 친구 목록에 이 사람이 있다면 당장 차단하세요',
		channelName: '철멍뭉',
		thumbnailUrl: 'https://i.ytimg.com/vi/AuEQgxW3LKk/hqdefault.jpg',
	},
];
export default function SearchBar({ placeholder, searchFn, removeFn }: Props) {
	const param = useParams();
	const router = useRouter();
	const [keyword, setKeyword] = useState('');
	const [searchList, setSearchList] = useState<Video[]>([]);
	const [open, setOpen] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await youtubeApis.serchKeyword({ keyword }); // 비동기 요청 보내기
			setSearchList(res); // 검색 결과 업데이트
			// eslint-disable-next-line no-unused-expressions
			searchFn && searchFn(res); // searchFn을 호출하여 검색 결과 전달
			setOpen(true);
			setKeyword('');
		} catch (error) {
			// 오류 처리
			console.error('검색 요청 중 오류 발생:', error);
		}
	};
	// console.log('서치바', searchList[0]);
	return (
		<div className="flex justify-center">
			<div className="bg-input w-[85%] h-16 rounded-xl flex justify-start gap-5 items-center mb-5">
				<AiOutlineSearch className="text-3xl ml-5" />
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder={placeholder}
						value={keyword}
						onChange={handleChange}
						className="text-[1.4rem] bg-input w-[30rem] min-w-full"
					/>
				</form>
				{open && (
					<TiDeleteOutline
						className="text-3xl absolute right-24 text-fontGray cursor-pointer"
						onClick={() => {
							setOpen(false);
							// eslint-disable-next-line no-unused-expressions
							removeFn && removeFn();
							router.refresh();
						}}
					/>
				)}
			</div>
		</div>
	);
}
