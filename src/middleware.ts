import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('accessToken')?.value;
	const pathUrl = request.nextUrl.pathname;

	// 로그인 된 사용자가 로그인 페이지 요청 시 / 페이지로 강제 리다이렉트
	if (accessToken && pathUrl.startsWith('/login')) {
		return NextResponse.redirect(new URL('/', request.url));
	}
	// 로그인 미완료된 사용자가 일반 페이지 요청 시 로그인 페이지로 강제 리다이렉트
	if (!accessToken && !pathUrl.startsWith('/login')) {
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
