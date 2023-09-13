'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function ChattingPage() {
	// 불러온 메세지 내역 저장
	const [messages, setMessages] = useState<string[]>([]);
	// 새로 전송할 메세지 상태
	const [newMessage, setNewMessage] = useState('');

	const client = useRef<CompatClient>();

	const wsConnectSubscribe = () => {
		client.current = Stomp.over(() => {
			const sock = new SockJS('https://83d7-114-205-30-236.ngrok-free.app/ws-stomp');
			return sock;
		});
		try {
			client.current.connect(
				{
					header: {
						'ngrok-skip-browser-warning': '69420',
					},
				},
				() => {
					client.current!.subscribe(
						// `/백엔드와 협의한 api주소/{구독하고 싶은 방의 id}`,
						`/queue/test`,
						(data) => {
							const testMessage = JSON.parse(data.body);
							console.log(testMessage);
						},
						{}
					);
					client.current!.send(`/app/test`, {}, JSON.stringify({}));
				}
			);
		} catch (e) {
			console.log(e);
		}
	};
	const sendHandler = () => {
		client.current!.send('/백엔드와 협의한 api주소', {}, JSON.stringify(newMessage));
	};
	useEffect(() => {
		wsConnectSubscribe();
	}, []);
	return (
		<div className="flex flex-col">
			<div className="w-[100%] h-[40rem]">
				{messages.map((message, index) => (
					<div key={index}>{message}</div>
				))}
			</div>
			<div className="flex justify-evenly bg-blue-200 w-100 h-[5rem] text-2xl">
				<input className="bg-blue-200" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
				<button onClick={sendHandler}>Send</button>
			</div>
		</div>
	);
}
