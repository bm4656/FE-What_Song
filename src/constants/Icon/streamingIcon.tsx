import { BottomModal } from '@/types/modal';
import { Icons } from './ReactIcons';

type Icons = {
	name: string;
	icon: JSX.Element;
	type: BottomModal;
};

export const hostIconsFirst: Icons[] = [
	{ name: '공유', icon: Icons.share, type: 'SHARE' },
	{ name: '참여자', icon: Icons.users, type: 'USERS' },
];
export const hostIconsLast: Icons[] = [
	{ name: '변경', icon: Icons.modify, type: 'ADD' },
	{ name: '수락', icon: Icons.adjustments, type: 'ACCEPT' },
];
export const userIcons: Icons[] = [
	{ name: '요청', icon: Icons.playButton, type: 'REQUEST' },
	{ name: '참여자', icon: Icons.users, type: 'USERS' },
	{ name: '공유', icon: Icons.share, type: 'SHARE' },
];
