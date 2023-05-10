'use client';

import { ReactNode } from 'react';
import { Provider, createStore } from 'jotai';

const myStore = createStore();

type Props = {
	children: ReactNode;
};

export default function Jotai({ children }: Props) {
	return <Provider store={myStore}>{children}</Provider>;
}
