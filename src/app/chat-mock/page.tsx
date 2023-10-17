'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { RiCloudFill } from 'react-icons/ri';
import LottieView from '@/components/LottieView';
import heartEmoji from '../../../public/lottie/heartEmoji.json';
// import { getCookie } from '@/constants/cookie';

type Message = { message: string };
const emoji = ['👏', '💪', '🔥', '❤️', '🤩'];
const mock = [{ message: 'ㅋㅋㅋㅋ' }, { message: 'good' }, { message: 'wow' }];
export default function ChattingMockPage() {
	// 불러온 메세지 내역 저장
	const [messages, setMessages] = useState<Message[]>([]);
	// 새로 전송할 메세지 상태
	const [newMessage, setNewMessage] = useState('');
	// 최근의 채팅으로 스크롤 위한 ref
	const messagesEndRef = useRef<HTMLDivElement>(null);
	//인터랙션 상태
	const [interaction, setInteraction] = useState(false);
	const handleButton = (e) => {
		// console.log(e.target.value);
		setInteraction(true);
		setTimeout(() => {
			setInteraction(false);
		}, 2300);
	};

	const mockSubscribe = () => {
		setMessages(mock);
	};

	const sendHandler = (e) => {
		e.preventDefault();

		if (newMessage !== '') {
			setMessages([...messages, { message: newMessage }]);
			setNewMessage('');
		}
	};
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);
	useEffect(() => {
		mockSubscribe();
	}, []);
	useEffect(() => {
		const receiveMessage = (msg: string) => {
			setMessages((prevMessages) => [...prevMessages, { message: msg }]);
		};

		const interval = setInterval(() => {
			receiveMessage(`채팅 메시지 ${messages.length + 1}`);
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [messages]);
	return (
		<section>
			{/* 채팅 메세지 목록 */}
			<div className="w-full absolute bottom-52 p-8 h-[230px] overflow-scroll bg-black bg-opacity-10">
				<ul className="">
					{messages.map((message, index) => (
						<li className="p-1 m-2 ml-5 w-fit text-white text-xl" key={index}>
							{message.message}
						</li>
					))}
					<div ref={messagesEndRef} />
				</ul>
			</div>
			{/* 인터랙션 이모지 */}
			{interaction && <LottieView file={heartEmoji} styles="absolute w-full h-full" />}
			<article className="flex flex-col gap-2 w-full h-44 px-10 absolute bottom-8">
				<ul className="flex justify-evenly items-center h-20">
					{emoji.map((item) => (
						<li className="text-4xl p-5 hover:scale-110" key={item}>
							<button onClick={handleButton} value={item}>
								{item}
							</button>
						</li>
					))}
				</ul>
				<form
					className="bg-zinc-200 flex justify-between items-center overflow-hidden h-20 rounded-[28px]"
					onSubmit={sendHandler}
				>
					<input
						className="w-full pl-10 text-2xl text-zinc-400 bg-zinc-200"
						placeholder="구름 채팅 띄우기..."
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
					/>
					<RiCloudFill className="text-6xl text-primary m-7 p-0.5" onClick={sendHandler} />
				</form>
			</article>
		</section>
	);
}
