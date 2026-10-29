<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { cart } from '$lib/cart.svelte';
	import { ui } from '$lib/ui.svelte';
	import { formatVND } from '$lib/format';

	function checkout() {
		if (cart.items.length === 0) return;
		goto(resolve('/checkout'));
	}
</script>

<svelte:head><title>Giỏ hàng — mộc.</title></svelte:head>

<div class="max-w-[980px] mx-auto px-6 lg:px-12 py-12 pb-28">
	<a
		href={resolve('/')}
		class="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors"
	>
		<span class="material-symbols-outlined text-[16px]">arrow_back</span>
		Tiếp tục mua sắm
	</a>
	<h1 class="font-display-lg text-display-lg text-on-surface mt-16 mb-12">Giỏ hàng</h1>

	{#if cart.items.length === 0}
		<div class="border-t border-outline-variant pt-8">
			<p class="font-body-md text-body-md text-on-surface-variant">Giỏ hàng đang trống.</p>
			<a
				href={resolve('/')}
				class="inline-block mt-3 text-primary-container hover:text-primary font-label-lg text-label-lg transition-colors"
				>Xem bộ sưu tập →</a
			>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-14 md:gap-24">
			<section>
				{#each cart.items as item (item.id)}
					<article class="flex items-center gap-4 border-t border-outline-variant py-5">
						<img src={item.image} alt={item.name} class="w-24 h-24 object-cover rounded shrink-0" />
						<div class="flex-1 min-w-0">
							<span
								class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold"
								>{item.category}</span
							>
							<h2 class="font-headline-sm text-[18px] text-on-surface mt-1">{item.name}</h2>
							<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
								{formatVND(item.price)}
							</p>
							<div class="mt-3 inline-flex items-center border border-outline-variant">
								<button
									type="button"
									aria-label="Giảm số lượng"
									onclick={() => cart.decrease(item.id)}
									class="px-3 py-1.5 hover:bg-surface-container transition-colors">−</button
								>
								<span class="w-8 text-center font-label-sm text-label-sm text-on-surface"
									>{item.quantity}</span
								>
								<button
									type="button"
									aria-label="Tăng số lượng"
									onclick={() => {
										const error = cart.add(item);
										if (error) ui.showError(error);
									}}
									class="px-3 py-1.5 hover:bg-surface-container transition-colors">+</button
								>
							</div>
						</div>
						<button
							type="button"
							aria-label="Xóa {item.name} khỏi giỏ"
							onclick={() => cart.remove(item.id)}
							class="text-on-surface-variant/70 hover:text-error transition-colors p-2"
						>
							<span class="material-symbols-outlined text-[18px]">delete</span>
						</button>
					</article>
				{/each}
			</section>
			<aside class="self-start border-t border-on-surface pt-5">
				<p class="font-body-sm text-body-sm text-on-surface-variant">Tạm tính</p>
				<strong class="block font-headline-lg text-headline-lg font-normal text-on-surface mt-2"
					>{formatVND(cart.total)}</strong
				>
				<p class="font-body-sm text-body-sm text-secondary mt-2">Miễn phí vận chuyển toàn quốc</p>
				<button
					type="button"
					onclick={checkout}
					class="mt-7 w-full py-4 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary rounded font-label-lg text-label-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
				>
					<span>Tiến hành thanh toán</span>
					<span class="material-symbols-outlined text-[18px]">lock</span>
				</button>
				<small class="block font-label-sm text-[11px] text-on-surface-variant/70 mt-3">
					Bước tiếp theo: nhập thông tin giao nhận &amp; chọn hình thức thanh toán.
				</small>
			</aside>
		</div>
	{/if}
</div>
