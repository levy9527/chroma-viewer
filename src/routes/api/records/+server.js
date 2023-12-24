import { json } from '@sveltejs/kit';

export async function GET({ request, cookies, url }) {
  console.log('requesting records')
  const apiBase = cookies.get('apiBase')

  const response = await fetch(apiBase + `/api/v1/collections/${url.searchParams.get('collectionId')}/get`, {
    method: 'POST',
    body: JSON.stringify({
      limit: url.searchParams.get('limit'),
      offset: url.searchParams.get('offset')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  console.log(data)

	return json({ success: true }, { status: 200 }, {payload: data});
}
