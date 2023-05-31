import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../../components/bar/SearchBar';

const meta: Meta<typeof SearchBar> = {
	title: 'Example/SearchBar',
	component: SearchBar,
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Primary: Story = {
	args: {},
};
