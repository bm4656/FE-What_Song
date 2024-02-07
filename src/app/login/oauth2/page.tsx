'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { SERVICE_URL } from '@/constants/ServiceUrl';
import { setCookie } from '@/constants/cookie';
import { loginApis } from '@/app/service/login';
import { registerInfo } from '@/state/store/login';

export default function CallbackPage() {
	const router = useRouter();
	const setRegisterInfo = useSetAtom(registerInfo);

	const { data } = useQuery(
		['oauth2', 'kakao'],
		() => loginApis.getLogin(new URL(document.location.toString()).searchParams.get('code') as string),
		{
			onSuccess: (res) => {
				// console.log(res);
				// 로그인 성공
				const accessToken = res.data.data.access_token;
				const refreshToken = res.data.data.refresh_token;
				const accessExpires = new Date(Date.now() + 1000 * res.data.data.expires_in);
				const refreshExpires = new Date(Date.now() + 1000 * res.data.data.refresh_token_expires_in);
				// 회원일시 로그인 완료
				if (res.data.data.oauthId) {
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
					setRegisterInfo({ accessToken, refreshToken });
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
