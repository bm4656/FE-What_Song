import type { Meta, StoryObj } from '@storybook/react';
import MusicRoomCard2 from '../../components/music/card/MusicRoomCard2';

const meta: Meta<typeof MusicRoomCard2> = {
	title: 'Example/MusicRoomCard2',
	component: MusicRoomCard2,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MusicRoomCard2>;

export const Primary: Story = {
	args: {
		musicRoom: {
			title: '방제목',
			host: '닉네임',
			view: 30,
			isOwner: false,
			thumnail: '/assets/sample.png',
		},
	},
};
