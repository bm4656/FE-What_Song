'use client';

import { FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { youtubeApis } from '@/app/service/youtube';
import { ResVideo, Video } from '@/types/video';

type Props = {
	placeholder: string;
	searchFn?: (searchResults: ResVideo[]) => void;
	removeFn?: () => void;
	searchType?: 'music' | 'user';
};
export default function SearchBar({ placeholder, searchFn, removeFn, searchType = 'music' }: Props) {
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
			const res = await youtubeApis.serchKeyword({ keyword });
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
