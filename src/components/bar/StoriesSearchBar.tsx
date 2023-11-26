'use client';

import { FormEvent, useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { youtubeApis } from '@/app/service/youtube';
import { ResVideo, Video } from '@/types/video';

type Props = {
	placeholder: string;
	searchFn?: (searchResults: ResVideo[]) => void;
	removeFn?: () => void;
	searchType?: 'music' | 'user';
};
export default function StoriesSearchBar({ placeholder, searchFn, removeFn, searchType = 'music' }: Props) {
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
		<>
			<div className="bg-neutral-200 w-[98%] h-16 rounded-xl flex items-center justify-center gap-2 mt-10 overflow-hidden relative">
				<AiOutlineSearch className="text-3xl absolute left-10" />
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder={placeholder}
						value={keyword}
						onChange={handleChange}
						className="text-[1.4rem] max-w-full bg-neutral-200 absolute left-[5.5rem] top-[1.1rem]"
					/>
				</form>
				<button
					onClick={() => {
						setKeyword('');
						setSearchList([]);
					}}
				>
					{keyword && <FiDelete className="text-2xl mr-4 absolute right-10 top-[1.2rem]" />}
				</button>
			</div>
		</>
	);
}
