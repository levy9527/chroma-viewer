import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { apiBase } = await request.json();
	cookies.set('apiBase', apiBase, { path: '/' })

	return json({ success: true }, { status: 200 });
}
