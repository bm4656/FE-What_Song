import { atom } from 'jotai';

type User = {
	email: string;
	imgURL: string;
	memberSeq: number;
	nickname: string;
	oauthId: string;
};

export const UserInfoAtom = atom<User>({ email: '', imgURL: '', memberSeq: 0, nickname: '', oauthId: '' });
