'use client';

import { FormEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { youtubeApis } from '@/app/service/youtube';
import MusicBarList from '../music/MusicBarList';

type Props = {
	placeholder: string;
};
export default function SearchBar({ placeholder }: Props) {
	const [keyword, setKeyword] = useState('');
	const [searchList, setSearchList] = useState([]);
	const [open, setOpen] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		youtubeApis.serchKeyword({ keyword }).then((res) => setSearchList(res));
		setOpen(true);
		setKeyword('');
	};
	return (
		<>
			<div className="bg-input w-full h-16 rounded-xl flex justify-start gap-5 items-center mb-5">
				<AiOutlineSearch className="text-3xl ml-5" />
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder={placeholder}
						value={keyword}
						onChange={handleChange}
						className="text-[1.4rem] bg-input w-[38rem]"
					/>
				</form>
				{open && (
					<TiDeleteOutline
						className="text-3xl absolute right-12 cursor-pointer"
						onClick={() => {
							setOpen(false);
							setSearchList([]);
						}}
					/>
				)}
			</div>
			{searchList[0] && (
				<div className="w-full h-[65%] bg-slate-50 overflow-y-scroll p-7 rounded-2xl shadow-md">
					<MusicBarList list={searchList} />
				</div>
			)}
		</>
	);
}
