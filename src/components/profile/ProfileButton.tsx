type Props = {
	addStyle?: string;
	children?: React.ReactNode;
	clickFn?: () => void;
};

export default function ProfileButton({ addStyle, children, clickFn }: Props) {
	return (
		<button className={`bg-neutral-200 h-16 rounded-xl font-semibold ${addStyle}`} onClick={clickFn}>
			{children}
		</button>
	);
}
