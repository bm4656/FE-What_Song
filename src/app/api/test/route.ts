export async function GET() {
	// eslint-disable-next-line
	const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();
	const encoder = new TextEncoder();

	const sendEventData = async () => {
		for (let i = 0; i < 5; i += 1) {
			writer.write(encoder.encode(`data: ${i}\n\n`));
			// eslint-disable-next-line
			await delay(1000);
		}
		writer.close();
	};

	sendEventData();

	return new Response(readable, {
		headers: {
			'Content-Type': 'text/event-stream',
			Connection: 'keep-alive',
			'Cache-Control': 'no-cache, no-transform',
		},
	});
}
