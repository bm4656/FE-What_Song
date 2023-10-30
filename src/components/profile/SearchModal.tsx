'use client';

import { AiOutlineSearch } from 'react-icons/ai';
import { FormEvent, useState } from 'react';
import { SimpleUser } from '@/types/user';
import { friendApis } from '@/app/service/friend';
import useUser from '@/hooks/useUser';
import UserCard from './UserCard';

export default function SearchModal() {
	const [searchList, setSerchList] = useState<SimpleUser[]>([]);
	const [targetName, setTargetName] = useState('');
	const user = useUser();

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setTargetName(e.target.value);
		try {
			const ownerSeq = await user.data?.memberSeq;
			const res = await friendApis.searchName({ ownerSeq, targetName });
			// eslint-disable-next-line no-unused-expressions
			// console.log(res);
			setSerchList(res);
		} catch (error) {
			// 오류 처리
			console.error('검색 요청 중 오류 발생:', error);
		}
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const ownerSeq = await user.data?.memberSeq;
			const res = await friendApis.searchName({ ownerSeq, targetName });
			// eslint-disable-next-line no-unused-expressions
			// console.log(res);
			setSerchList(res);
			setTargetName('');
		} catch (error) {
			// 오류 처리
			console.error('검색 요청 중 오류 발생:', error);
		}
	};

	return (
		<section className="absolute bg-neutral-100 w-full h-[50%]">
			<article className="w-full flex justify-center items-center p-2">
				<div className="bg-neutral-200 w-[85%] h-16 rounded-xl flex items-center gap-2">
					<AiOutlineSearch className="text-3xl ml-5" />
					<div className="">
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="검색"
								value={targetName}
								onChange={handleChange}
								className="text-[1.4rem] bg-neutral-200 w-[30rem] min-w-full"
							/>
						</form>
					</div>
				</div>
			</article>
			<ul>
				{searchList?.[0] &&
					searchList?.map((item) => (
						<li key={item.memberSeq}>
							<UserCard user={item} />
						</li>
					))}
			</ul>
		</section>
	);
}
