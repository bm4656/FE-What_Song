import type { Meta, StoryObj } from '@storybook/react';
import ButtonBar from '../../components/bar/ButtonBar';

const meta: Meta<typeof ButtonBar> = {
	title: 'Bar/buttonBar',
	component: ButtonBar,
};

export default meta;

type Story = StoryObj<typeof ButtonBar>;

export const Primary: Story = {
	args: {
		clickFn: () => null,
		content: '다음',
	},
};
