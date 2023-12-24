async function listCollections({ cookies }) {
  console.log('requesting listCollections')

  const apiBase = cookies.get('apiBase')
  if (!apiBase) {
    console.log('apiBase not set')
    return {collections: []}
  }

  const response = await fetch(apiBase + '/api/v1/collections?tenant=default_tenant&database=default_database')
  const data = await response.json()
  console.log(data)

  return {collections: data, apiBase}
}

export async function load({cookies}) {
  return await listCollections({cookies})
}