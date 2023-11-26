import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	// TODO 로그인 상태가 아닐시 로그인 페이지로 이동?
	return NextResponse.redirect(new URL('/home', request.url));
}
export const config = {
	matcher: '/',
};
