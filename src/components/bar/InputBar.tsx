type Props = {
	placeholder: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	styles?: string;
};

export default function InputBar({ placeholder, value, onChange, styles = '' }: Props) {
	return (
		<input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`${styles} w-full rounded-[0.8rem] h-[4.5rem] p-[1.5rem] text-[1.4rem]`}
		/>
	);
}
