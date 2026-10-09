<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Catalog from '$lib/components/Catalog.svelte';
	import Story from '$lib/components/Story.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>mộc. — Đồ vật nhỏ cho đời sống hằng ngày</title>
	<meta
		name="description"
		content="mộc. — minishop đồ thủ công xây bằng SvelteKit, TypeScript và Svelte 5 runes."
	/>
</svelte:head>

<Hero />
<Catalog products={data.products} categories={data.categories} />
<Story />
