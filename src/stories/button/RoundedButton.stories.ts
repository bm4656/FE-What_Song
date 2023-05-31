import type { Meta, StoryObj } from '@storybook/react';
import RoundedButton from '../../components/button/RoundedButton';

const meta: Meta<typeof RoundedButton> = {
	title: 'Example/RoundedButton',
	component: RoundedButton,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RoundedButton>;

export const Pink: Story = {
	args: {
		name: '버튼',
		color: 'pink',
	},
};

export const Blue: Story = {
	args: {
		name: '버튼',
		color: 'blue',
	},
};
