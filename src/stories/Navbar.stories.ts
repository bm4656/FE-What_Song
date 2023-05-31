import type { Meta, StoryObj } from '@storybook/react';
import Navbar from '../components/Navbar';

const meta: Meta<typeof Navbar> = {
	title: 'Example/Navbar',
	component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
	args: {
		tab: 'home',
	},
};

export const Music: Story = {
	args: {
		tab: 'music',
	},
};

export const Dm: Story = {
	args: {
		tab: 'dm',
	},
};

export const Profile: Story = {
	args: {
		tab: 'profile',
	},
};
