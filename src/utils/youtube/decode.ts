import { decode } from 'html-entities';
import { ResVideo } from '@/types/video';

export const decodeTitle = (list: ResVideo[]) => {
	const decoded = list.map((item) => {
		item.title = decode(item.title);
		return item;
	});
	return decoded;
};
