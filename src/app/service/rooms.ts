import { readFile } from 'fs/promises';
import path from 'path';

export type Room = {
	title: string;
	host: string;
	view: number;
	isOwner: boolean;
	thumnail: string;
	id: number;
};

export async function getAllRooms(): Promise<Room[]> {
	const filePath = path.join(process.cwd(), 'public', 'data.json');
	return readFile(filePath, 'utf-8').then<Room[]>(JSON.parse);
}
