import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('accessToken')?.value;
	if (accessToken) {
		// 로그인 페이지 요청시 사용자 검증이 완료된 상태면 / 페이지로 강제 리다이렉트
		if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname.startsWith('/register')) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	} else if (!request.nextUrl.pathname.startsWith('/login') && !accessToken) {
		// 일반 페이지 요청시 사용자 검증이 미완료된 상태라면 로그인 페이지로 강제 리다이렉트
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - server/ (네트워크 요청 경로)
		 */
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico|server).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
};
