'use client';

import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type Props = {
	placeholder: string;
};

export default function SearchBar({ placeholder }: Props) {
	const [keyword, setKeyword] = useState('');
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};
	return (
		<form className="flex justify-center items-center mb-5">
			<div className="bg-input w-[47.5rem] h-16  rounded-xl flex justify-start gap-5 items-center">
				<AiOutlineSearch className="text-3xl ml-5" />
				<input
					type="text"
					placeholder={placeholder}
					value={keyword}
					onChange={handleChange}
					className="text-[1.4rem] bg-input w-[80%]"
				/>
			</div>
		</form>
	);
}
