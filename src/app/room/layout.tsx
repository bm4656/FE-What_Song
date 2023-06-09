export default function RoomLayout({ children }: { children: React.ReactNode }) {
	return <section className="overflow-y-auto overflow-x-hidden absolute w-full h-full">{children}</section>;
}
