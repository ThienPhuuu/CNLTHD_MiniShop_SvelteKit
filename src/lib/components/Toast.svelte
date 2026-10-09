<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ui } from '$lib/ui.svelte';
</script>

{#if ui.toastMessage}
	<div
		transition:fly={{ y: 64, duration: 300 }}
		class="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 pointer-events-none"
		role="status"
	>
		<span class="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
		<span class="font-body-sm text-body-sm">{ui.toastMessage}</span>
	</div>
{/if}
