<script>
	import Select from 'svelte-select';
	import { Button, Input, Grid, Loader } from '@svelteuidev/core';
	export let data;

  const items = data.collections.map(v => Object.assign({}, v, {label: v.name, value: v.id}));
  const optionIdentifier = 'id';
  const appendCollectionInfo = option => ` (${option.tenant}/${option.database})`
  const getOptionLabel = (option) => option.name + appendCollectionInfo(option);
  const getSelectionLabel = (option) => option.name

  let apiBase = data.apiBase
  let isLoading = false
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

  const selectCollection = async (e) => {
    const params = new URLSearchParams();
    params.append('collectionId', e.detail.id);
    params.append('limit', 1000);
    params.append('offset', 0);

    const response = await fetch(`/api/records?` + params, {
      method: 'GET',
    })
    console.log(response)
  }
</script>

<h2>Settings</h2>
<Grid>
    <Grid.Col span={8}>
      <Input placeholder="api_base url" bind:value={apiBase} />
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
