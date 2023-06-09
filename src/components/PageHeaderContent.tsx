type Props = {
	content: string;
	mb?: string;
	mt?: string;
};

export default function PageHeaderContent({ content, mb = 'mb-[0rem]', mt = 'mt-[0rem]' }: Props) {
	return <h1 className={`text-[2.2rem] font-bold ${mb} ${mt}`} dangerouslySetInnerHTML={{ __html: content }} />;
}
