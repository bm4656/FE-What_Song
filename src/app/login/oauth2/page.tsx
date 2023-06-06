'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import { setCookie } from '@/constants/cookie';
import { loginApis } from '@/app/service/login';

export default function CallbackPage() {
	const router = useRouter();
	const { data } = useQuery(
		['oauth2', 'kakao'],
		() => loginApis.getLogin(new URL(document.location.toString()).searchParams.get('code') as string),
		{
			onSuccess: (res) => {
				console.log(res);
				const accessToken = res.headers['authorization']?.split(' ')[1];
				const refreshToken = res.headers['refresh']?.split(' ')[1];

				// 회원일시 로그인 완료
				if (accessToken && refreshToken) {
					const accessExpires = new Date();
					accessExpires.setDate(Date.now() + 1000 * 60 * 60 * 24); // 1일로 설정
					const refreshExpires = new Date();
					refreshExpires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7일로 설정
					setCookie('accessToken', accessToken, {
						path: '/',
						expires: accessExpires,
					});
					setCookie('refreshToken', refreshToken, {
						path: '/',
						expires: refreshExpires,
					});
					router.push(`${SERVICE_URL.home}`);
				} else {
					// 회원이 아닐시 회원가입 페이지 이동
					const kakaoUserInfo = res.data;
					const kakaoInfoExpires = new Date();
					kakaoInfoExpires.setDate(Date.now() + 1000 * 60 * 60 * 24); // 1일로 설정
					setCookie('kakaoUserInfo', kakaoUserInfo, {
						path: '/',
						expires: kakaoInfoExpires,
					});
					router.push(`${SERVICE_URL.register}?page=1`);
				}
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	return <div />;
}
