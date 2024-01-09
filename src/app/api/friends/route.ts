import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { SimpleUser } from '@/types/user';

export async function GET() {
	const filePath = '/Users/bomin/dev/FE-What_Song/public/data/friends-mock.json';
	const res = await readFile(filePath, 'utf-8').then<SimpleUser[]>(JSON.parse);
	return NextResponse.json(res);
}
