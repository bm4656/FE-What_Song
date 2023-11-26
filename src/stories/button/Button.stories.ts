import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/button/Button';

const meta: Meta<typeof Button> = {
	title: 'button/Button',
	component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		content: '다음',
	},
};
