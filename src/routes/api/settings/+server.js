import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
  console.log('save settings')
	const { apiBase } = await request.json();
	cookies.set('apiBase', apiBase, { path: '/' })

	return json({ success: true }, { status: 200 });
}

export async function DELETE({ request, cookies }) {
  console.log('clear settings')
  cookies.delete('apiBase', {
    path: '/',
  });

	return json({ success: true }, { status: 200 });
}
