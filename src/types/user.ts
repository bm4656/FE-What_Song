export type SimpleUser = {
	email: string;
	imgURL: string;
	memberSeq: string;
	nickname: string;
};

export type RawUser = SimpleUser & {
	innerNickname: string;
	memberRole: string;
	oauthId: string;
	profileMusic: string;
	refreshToken: string;
	socialType: string;
};
