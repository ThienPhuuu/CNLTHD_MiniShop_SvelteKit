<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ui } from '$lib/ui.svelte';
</script>

{#if ui.toastMessage}
	<div
		transition:fly={{ y: ui.toastType === 'error' ? -64 : 64, duration: 300 }}
		class:top-6={ui.toastType === 'error'}
		class:right-6={true}
		class:bottom-6={ui.toastType === 'success'}
		class:bg-error={ui.toastType === 'error'}
		class:text-on-error={ui.toastType === 'error'}
		class:bg-inverse-surface={ui.toastType === 'success'}
		class:text-inverse-on-surface={ui.toastType === 'success'}
		class="fixed z-50 px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 pointer-events-none"
		role="status"
	>
		<span
			class="material-symbols-outlined text-[20px]"
			class:text-on-error={ui.toastType === 'error'}
			class:text-secondary-fixed={ui.toastType === 'success'}
			>{ui.toastType === 'error' ? 'error' : 'check_circle'}</span
		>
		<span class="font-body-sm text-body-sm">{ui.toastMessage}</span>
	</div>
{/if}
