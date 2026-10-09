<script lang="ts">
	import { resolve } from '$app/paths';
	import { cart } from '$lib/cart.svelte';
	import { ui } from '$lib/ui.svelte';
</script>

<header
	class="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(30,27,25,0.04)]"
>
	<div class="h-20 max-w-[1320px] mx-auto px-6 lg:px-12 flex items-center justify-between">
		<div class="flex items-center gap-12">
			<a href={resolve('/')} class="group flex items-baseline">
				<span class="font-headline-md text-headline-md tracking-tight text-on-surface"
					>mộc<span class="text-primary">.</span></span
				>
			</a>
			<nav class="hidden md:flex items-center gap-8">
				<a
					href={resolve('/#danh-muc-san-pham')}
					class="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
					>Cửa hàng</a
				>
				<a
					href={resolve('/#triet-ly')}
					class="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
					>Câu chuyện</a
				>
				<a
					href={resolve('/#triet-ly')}
					class="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
					>Nghệ nhân</a
				>
				<a
					href={resolve('/#footer')}
					class="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
					>Liên hệ</a
				>
			</nav>
		</div>
		<div class="flex items-center gap-5">
			<button
				type="button"
				onclick={() => ui.openCart()}
				class="group relative flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-surface-container-high transition-colors"
			>
				<span
					class="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface text-[20px]"
					>shopping_bag</span
				>
				<span
					class="hidden sm:inline font-label-sm text-label-sm uppercase text-on-surface-variant group-hover:text-on-surface tracking-wider"
					>Giỏ hàng</span
				>
				{#if cart.count > 0}
					<span
						class="inline-flex items-center justify-center h-4 min-w-[1rem] px-1 rounded-full bg-primary text-on-primary font-label-sm text-[10px] leading-none"
						>{cart.count}</span
					>
				{/if}
			</button>
			<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
				<span class="material-symbols-outlined text-on-primary text-[18px]">person</span>
			</div>
		</div>
	</div>
</header>
