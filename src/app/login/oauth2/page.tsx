'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import { setCookie } from '@/constants/cookie';
import { loginApis } from '@/app/service/login';
import { UserInfoAtom, registerInfo } from '@/state/store/login';
import { accessExpires, refreshExpires } from '@/utils/login';

export default function CallbackPage() {
	const router = useRouter();
	const setUserInfo = useSetAtom(UserInfoAtom);
	const setRegisterInfo = useSetAtom(registerInfo);

	const { data } = useQuery(
		['oauth2', 'kakao'],
		() => loginApis.getLogin(new URL(document.location.toString()).searchParams.get('code') as string),
		{
			onSuccess: (res) => {
				const accessToken = res.headers['authorization']?.split(' ')[1];
				const refreshToken = res.headers['refresh']?.split(' ')[1];

				// 회원일시 로그인 완료
				if (accessToken && refreshToken) {
					setCookie('accessToken', accessToken, {
						path: '/',
						expires: accessExpires,
					});
					setCookie('refreshToken', refreshToken, {
						path: '/',
						expires: refreshExpires,
					});
					// TODO 임시로 클라이언트 상태에 저장한 상태 (프로토타입)
					setUserInfo(res.data);
					router.push(`${SERVICE_URL.home}`);
				} else {
					// 회원이 아닐시 회원가입 페이지 이동
					const kakaoUserInfo = res.data;
					setRegisterInfo(kakaoUserInfo);
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
