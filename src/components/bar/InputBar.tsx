interface Props {
	placeholder: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBar({ placeholder, value, onChange }: Props) {
	return (
		<input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="w-full rounded-[0.8rem] h-[4.5rem] p-[1.5rem] mb-[15%] text-[1.4rem] bg-[#F8F8FA]"
		/>
	);
}
