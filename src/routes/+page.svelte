<script>
	import Select from 'svelte-select';
	import { Button, Input, Grid, Loader } from '@svelteuidev/core';
  import GridJs from "gridjs-svelte"
	export let data;

  const LIMIT = 1000
  const items = data.collections.map(v => Object.assign({}, v, {label: v.name, value: v.id}));
  const optionIdentifier = 'id';
  const appendCollectionInfo = option => ` (${option.tenant}/${option.database})`
  const getOptionLabel = (option) => option.name + appendCollectionInfo(option);
  const getSelectionLabel = (option) => option.name

  let apiBase = data.apiBase
  let isLoading = false
  function handleKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      saveSettings()
    }
  }

  const saveSettings = async () => {
    isLoading = true
    await fetch(`/api/settings`, {
      method: 'POST',
      body: JSON.stringify({ apiBase }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    isLoading = false
    location.reload()
  }

  const columns = ['id', 'metadata', 'document', 'embedding']
  let chunksApi = ''
  let grid = []
  let total = -1
  const selectCollection = async (e) => {
    const params = new URLSearchParams();
    params.append('collectionId', e.detail.id);
    params.append('limit', LIMIT);
    params.append('offset', 0);
    
    const response = await fetch(`/api/chunks/count?` + params, {
      method: 'GET',
    })
    const resp = await response.json()
    total  = resp.payload

    chunksApi = `/api/chunks?${params}`
  }

</script>

<h2>Settings</h2>
<Grid>
    <Grid.Col span={8}>
      <Input placeholder="api_base url" bind:value={apiBase} on:keydown={handleKeyDown}/>
    </Grid.Col>
    <Grid.Col span={4}>
      {#if !isLoading}
        <Button on:click={saveSettings}>
          Save
        </Button>
      {:else}
        <Loader variant='dots'/>
      {/if}
    </Grid.Col>
</Grid>

{#if apiBase && items.length > 0}
  <h2>Collection</h2>
  <Select {items}
    on:change={selectCollection}
    placeholder="select collection">
  </Select>

{/if}

{#if chunksApi }
  <h2>Chunks</h2>
  <GridJs {columns}
    pagination={{ enabled: true, limit: LIMIT,
      server: {
        url: (prev, page, limit) => {
          // params 会把带上/path，并且会 encode
          const params = new URLSearchParams(chunksApi)
          params.set('offset', page);
          return `${decodeURIComponent(params)}`
        }
      }
    }}
    server={{
      url: chunksApi,
      then: resp => resp.payload['ids'].map((v, i) => {
              return {
                id: v,
                document: resp.payload['documents'][i],
                metadata: resp.payload['metadatas'] ? JSON.stringify(resp.payload['metadatas'][i]) : '',
                embedding: resp.payload['embeddings'] ? resp.payload['embeddings'][i] : '',
              }
      }),
      total: () => {
        return total
      },
    }}
    />
{/if}

<style global>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
