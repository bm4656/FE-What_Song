type Props = {
	addStyle?: string;
	children?: React.ReactNode;
};

export default function ProfileButton({ addStyle, children }: Props) {
	return <button className={`bg-neutral-200 h-16 rounded-xl font-semibold ${addStyle}`}>{children}</button>;
}
