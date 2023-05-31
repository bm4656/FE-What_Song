import type { Meta, StoryObj } from '@storybook/react';
import ChattingBar from '../components/ChattingBar';

const meta: Meta<typeof ChattingBar> = {
	title: 'Example/ChattingBar',
	component: ChattingBar,
	// tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ChattingBar>;

export const Primary: Story = {
	args: {},
};
