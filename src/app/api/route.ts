import { NextResponse } from 'next/server';

export async function GET() {
	const data = {
		name: '꼬부기',
	};
	return NextResponse.json({ data });
}
