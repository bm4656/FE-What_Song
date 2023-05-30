import { readFile } from 'fs/promises';
import path from 'path';

export type Room = {
	title: string;
	host: string;
	view: number;
	isOwner: boolean;
	thumnail: string;
	id?: number;
};

export type Category = {
	categoryName: string;
	description: string;
};

export async function getAllRooms(): Promise<Room[]> {
	const filePath = path.join(process.cwd(), 'public', 'data.json');
	return readFile(filePath, 'utf-8').then<Room[]>(JSON.parse);
}

export async function getAllCategories(): Promise<Category[]> {
	const filePath = path.join(process.cwd(), 'public', 'category.json');
	return readFile(filePath, 'utf-8').then<Category[]>(JSON.parse);
}

export async function getRoomData(roomId: number): Promise<Room> {
	// 임시 목데이터 사용 시 로직
	const metadata = await getAllRooms().then((rooms) => rooms.find((room) => room.id?.toString() === roomId.toString()));
	if (!metadata) throw new Error(`id: ${roomId} room is not found.`);
	return metadata;
}
