'use client';

import { FormEvent, useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { SimpleUser } from '@/types/user';
import { friendApis } from '@/app/service/friend';
import UserCard from './UserCard';

export default function SearchFriend({ ownerSeq }: { ownerSeq: number }) {
	const [targetName, setTargetName] = useState('');
	const [searchList, setSearchList] = useState<SimpleUser[]>([]);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setTargetName(e.target.value);
		try {
			const res = await friendApis.searchName({ ownerSeq, targetName });
			// eslint-disable-next-line no-unused-expressions
			console.log(res);
			setSearchList(res);
		} catch (error) {
			// 오류 처리
			console.error('검색 요청 중 오류 발생:', error);
		}
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await friendApis.searchName({ ownerSeq, targetName });
			// eslint-disable-next-line no-unused-expressions
			// console.log(res);
			setSearchList(res);
			setTargetName('');
		} catch (error) {
			// 오류 처리
			console.error('검색 요청 중 오류 발생:', error);
		}
	};

	return (
		<>
			<div className="bg-neutral-200 w-[98%] h-16 rounded-xl flex items-center justify-center gap-2 mt-10 overflow-hidden">
				<AiOutlineSearch className="text-3xl absolute left-10" />
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="검색"
						value={targetName}
						onChange={handleChange}
						className="text-[1.4rem] max-w-[28rem] bg-neutral-200 absolute left-[5.5rem] top-[3.4rem]"
					/>
				</form>
				<button
					onClick={() => {
						setTargetName('');
						setSearchList([]);
					}}
				>
					{targetName && <FiDelete className="text-2xl mr-4 absolute right-10 top-[3.72rem]" />}
				</button>
			</div>
			<ul className="w-full absolute left-0 top-28">
				{searchList?.[0] &&
					searchList?.map((item) => (
						<li key={item.memberSeq}>
							<UserCard user={item} ownerSeq={ownerSeq} />
						</li>
					))}
			</ul>
		</>
	);
}
