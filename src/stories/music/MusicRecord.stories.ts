import type { Meta, StoryObj } from '@storybook/react';
import MusicRecord from '../../components/music/streaming/MusicRecord';

const meta: Meta<typeof MusicRecord> = {
	title: 'Example/MusicRecord',
	component: MusicRecord,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MusicRecord>;

export const Primary: Story = {
	args: {
		image: '/assets/sample.png',
	},
};
