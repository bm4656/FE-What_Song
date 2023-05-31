import type { Meta, StoryObj } from '@storybook/react';

import { ButtonEx } from '../components/ButtonEx/storybook/index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ButtonEx> = {
	title: 'Example/ButtonEx',
	component: ButtonEx,
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: {
			control: 'color',
		},
	},
};

export default meta;

type Story = StoryObj<typeof ButtonEx>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		primary: true,
		label: 'Button',
	},
};

export const Secondary: Story = {
	args: {
		label: 'Button',
	},
};

export const Large: Story = {
	args: {
		size: 'large',
		label: 'Button',
	},
};

export const Small: Story = {
	args: {
		size: 'small',
		label: 'Button',
	},
};
