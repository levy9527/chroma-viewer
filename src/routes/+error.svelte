<script>
	import { page } from '$app/stores';

	async function clear() {
    await fetch(`/api/settings`, {
      method: 'DELETE',
    });
    location.reload()
	}
</script>

<h1>{$page.status}: {$page.error.message}</h1>

<button on:click={clear}>clear cache</button>