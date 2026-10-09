<script lang="ts">
	import { resolve } from '$app/paths';
	import { cart } from '$lib/cart.svelte';
	import { ui } from '$lib/ui.svelte';
	import { formatVND } from '$lib/format';
	import type { Category, Product } from '$lib/types';

	let { products, categories }: { products: Product[]; categories: Category[] } = $props();

	let query = $state('');
	let selectedCategory = $state('all');

	let filteredProducts = $derived(
		products.filter(
			(product) =>
				(selectedCategory === 'all' || product.categoryId === selectedCategory) &&
				(!query.trim() || product.name.toLowerCase().includes(query.trim().toLowerCase()))
		)
	);

	function addToCart(product: Product) {
		cart.add(product);
		ui.showToast(`Đã thêm "${product.name}" vào túi hàng`);
		ui.openCart();
	}
</script>

<section
	class="w-full bg-surface-container-lowest py-16 lg:py-24 scroll-mt-20"
	id="danh-muc-san-pham"
>
	<div class="max-w-[1320px] mx-auto px-6 lg:px-12">
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10">
			<div>
				<div class="inline-flex items-center gap-2 mb-3">
					<span
						class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold"
						>Cửa hàng chọn lọc</span
					>
				</div>
				<h2 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">
					Món đồ đang chờ bạn
				</h2>
			</div>
			<div class="flex items-center gap-4 w-full md:w-auto">
				<div class="relative flex-1 md:w-72">
					<span
						class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline"
						>search</span
					>
					<label class="sr-only" for="catalog-search">Tìm kiếm đồ vật</label>
					<input
						class="w-full bg-surface-container-low pl-9 pr-4 py-2.5 rounded text-on-surface placeholder:text-on-surface-variant/50 font-body-sm text-body-sm focus:outline-none focus:bg-surface-container transition-colors"
						id="catalog-search"
						placeholder="Tìm kiếm đồ vật..."
						type="text"
						bind:value={query}
					/>
				</div>
				<button
					type="button"
					onclick={() => ui.openCart()}
					class="relative inline-flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-high hover:bg-surface-container-highest transition-colors font-label-sm text-label-sm text-on-surface"
				>
					<span class="material-symbols-outlined text-[18px]">shopping_bag</span>
					<span class="hidden sm:inline">Xem túi</span>
					{#if cart.count > 0}
						<span
							class="px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-semibold leading-none"
							>{cart.count}</span
						>
					{/if}
				</button>
			</div>
		</div>

		<div
			class="flex items-center gap-2 pb-10 overflow-x-auto no-scrollbar"
			role="group"
			aria-label="Lọc danh mục"
		>
			{#each categories as category (category.id)}
				<button
					type="button"
					onclick={() => (selectedCategory = category.id)}
					class="px-4 py-2 rounded font-label-sm text-label-sm uppercase tracking-wider transition-all {selectedCategory ===
					category.id
						? 'bg-secondary text-on-secondary'
						: 'bg-surface-container text-on-surface-variant hover:text-on-surface'}"
				>
					{category.label}
				</button>
			{/each}
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
			{#each filteredProducts as product (product.id)}
				<article
					class="group flex flex-col bg-surface-container-low rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
				>
					<div class="relative aspect-square overflow-hidden bg-surface-container">
						<img
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							alt={product.name}
							src={product.image}
							loading="lazy"
						/>
						<span
							class="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface/90 text-on-surface font-label-sm text-[10px] tracking-wider uppercase font-semibold"
							>{product.category}</span
						>
						<a
							href={resolve(`/san-pham/${product.id}`)}
							class="absolute inset-x-4 bottom-4 py-2.5 px-4 bg-surface/90 hover:bg-surface text-on-surface backdrop-blur-md rounded shadow-sm font-label-sm text-label-sm tracking-wider uppercase flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 focus:opacity-100 translate-y-2 group-hover:translate-y-0 focus:translate-y-0 transition-all duration-300"
						>
							<span class="material-symbols-outlined text-[18px]">visibility</span>
							<span>Xem chi tiết</span>
						</a>
					</div>
					<div class="p-5 flex flex-col flex-1 justify-between">
						<div>
							<p
								class="font-label-sm text-label-sm text-secondary font-medium uppercase tracking-wider mb-1"
							>
								{product.artisan}
							</p>
							<h3
								class="font-headline-sm text-[18px] text-on-surface group-hover:text-primary-container transition-colors mb-2"
							>
								<a href={resolve(`/san-pham/${product.id}`)}>{product.name}</a>
							</h3>
							<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
								{product.description}
							</p>
						</div>
						<div class="flex items-center justify-between pt-4 mt-auto">
							<span class="font-title-lg text-title-lg text-on-surface font-semibold"
								>{formatVND(product.price)}</span
							>
							<button
								type="button"
								onclick={() => addToCart(product)}
								title="Thêm vào giỏ hàng"
								class="px-3.5 py-2 rounded bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container font-label-sm text-label-sm transition-colors flex items-center gap-1.5"
							>
								<span class="material-symbols-outlined text-[16px]">add</span>
								<span>Thêm</span>
							</button>
						</div>
					</div>
				</article>
			{:else}
				<div class="col-span-full py-16 text-center">
					<span class="material-symbols-outlined text-[48px] text-outline mb-3">search_off</span>
					<p class="font-headline-sm text-headline-sm text-on-surface mb-2">
						Không tìm thấy món đồ phù hợp
					</p>
					<p class="font-body-md text-body-md text-on-surface-variant">
						Hãy thử từ khóa khác hoặc bấm chọn xem "Tất cả" danh mục.
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
