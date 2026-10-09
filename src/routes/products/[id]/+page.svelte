<script lang="ts">
	import ProductDetail from '$lib/components/ProductDetail.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.product.name} — mộc.</title>
	<meta name="description" content={data.product.description} />
</svelte:head>

{#key data.product.id}
	<ProductDetail product={data.product} related={data.related} />
{/key}
