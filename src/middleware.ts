import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	//  모든 request의 header에는 쿠키 값이 함께 들어오기 때문에 미들웨어에서 검사할 수 있음
	const accessToken = request.cookies.get('accssToken')?.value;
	// const refreshToken = request.cookies.get('refreshToken')?.value;
	// 쿠키가 없으면 login 페이지로 이동
	if (accessToken === undefined && accessToken === 'undefined') {
		return NextResponse.redirect(new URL('/login', request.url));
	}
	return NextResponse.next();
}
