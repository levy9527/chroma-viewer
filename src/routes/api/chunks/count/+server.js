import { json } from '@sveltejs/kit';

export async function GET({ request, cookies, url }) {
  console.log('requesting records count')
  const apiBase = cookies.get('apiBase')

  const response = await fetch(apiBase + `/api/v1/collections/${url.searchParams.get('collectionId')}/count`)
  const data = await response.json()
  console.log(data)

	return json({ success: true, payload: data }, { status: 200 });
}
