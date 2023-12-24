async function listCollections({ cookies }) {
  console.log('requesting listCollections')

  const apiBase = cookies.get('apiBase')
  if (!apiBase) {
    console.log('apiBase not set')
    return {collections: [], hasSettings: false}
  }

  const url = apiBase + '/api/v1/collections?tenant=default_tenant&database=default_database'
  console.log(url)

  const response = await fetch(url)
  const data = await response.json()
  console.log(data)

  return {collections: data, apiBase, hasSettings: true}
}

export async function load({cookies}) {
  return await listCollections({cookies})
}