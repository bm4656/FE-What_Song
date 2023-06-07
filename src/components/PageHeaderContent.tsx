type Props = {
	content: string;
	mb?: string;
};

export default function PageHeaderContent({ content, mb = 'mb-[0rem]' }: Props) {
	return <h1 className={`text-[2.2rem] font-bold ${mb}`} dangerouslySetInnerHTML={{ __html: content }} />;
}
