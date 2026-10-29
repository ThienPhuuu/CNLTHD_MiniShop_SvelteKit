<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import { cart } from '$lib/cart.svelte';
	import { ui } from '$lib/ui.svelte';
	import { formatVND } from '$lib/format';

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && ui.cartOpen) ui.closeCart();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if ui.cartOpen}
	<div
		class="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50"
		transition:fade={{ duration: 300 }}
	>
		<button
			type="button"
			aria-label="Đóng túi hàng"
			class="absolute inset-0 w-full h-full cursor-default"
			onclick={() => ui.closeCart()}
		></button>
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Túi mua hàng"
			class="absolute right-0 top-0 bottom-0 w-full max-w-md bg-surface shadow-2xl flex flex-col"
			transition:fly={{ x: 448, duration: 300 }}
		>
			<div class="p-6 bg-surface-container flex items-center justify-between">
				<div class="flex items-center gap-3">
					<span class="material-symbols-outlined text-primary-container text-[22px]"
						>shopping_bag</span
					>
					<div>
						<h3 class="font-headline-sm text-headline-sm text-on-surface">Túi mua hàng</h3>
						<p class="font-body-sm text-body-sm text-on-surface-variant">
							<span>{cart.count}</span> món đồ đã chọn
						</p>
					</div>
				</div>
				<button
					type="button"
					aria-label="Đóng túi hàng"
					class="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
					onclick={() => ui.closeCart()}
				>
					<span class="material-symbols-outlined text-[20px]">close</span>
				</button>
			</div>

			<div class="flex-1 overflow-y-auto p-6 space-y-4">
				{#each cart.items as item (item.id)}
					<div class="p-4 rounded-lg bg-surface-container flex items-start gap-4 transition-all">
						<img class="w-12 h-12 rounded object-cover shrink-0" src={item.image} alt={item.name} />
						<div class="flex-1 min-w-0">
							<span
								class="font-label-sm text-[10px] uppercase text-secondary font-semibold tracking-wider block mb-0.5"
								>{item.category}</span
							>
							<h4 class="font-headline-sm text-[15px] text-on-surface truncate leading-tight">
								{item.name}
							</h4>
							<p class="font-body-sm text-body-sm text-primary-container font-semibold mt-1">
								{formatVND(item.price)}
							</p>
							<div class="flex items-center justify-between mt-3">
								<div class="inline-flex items-center rounded bg-surface-container-lowest">
									<button
										type="button"
										aria-label="Giảm số lượng"
										onclick={() => cart.decrease(item.id)}
										class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors rounded-l"
									>
										<span class="material-symbols-outlined text-[14px]">remove</span>
									</button>
									<span
										class="w-8 text-center font-label-sm text-label-sm text-on-surface font-semibold"
										>{item.quantity}</span
									>
									<button
										type="button"
										aria-label="Tăng số lượng"
										onclick={() => {
											const error = cart.add(item);
											if (error) ui.showError(error);
										}}
										class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors rounded-r"
									>
										<span class="material-symbols-outlined text-[14px]">add</span>
									</button>
								</div>
								<button
									type="button"
									title="Xóa món đồ"
									aria-label="Xóa {item.name} khỏi túi"
									onclick={() => cart.remove(item.id)}
									class="text-on-surface-variant/70 hover:text-error transition-colors p-1"
								>
									<span class="material-symbols-outlined text-[18px]">delete</span>
								</button>
							</div>
						</div>
					</div>
				{:else}
					<div
						class="h-full flex flex-col items-center justify-center text-center py-12 text-on-surface-variant"
					>
						<span class="material-symbols-outlined text-[48px] text-outline-variant mb-3"
							>remove_shopping_cart</span
						>
						<p class="font-headline-sm text-[18px] text-on-surface mb-1">Túi hàng đang trống</p>
						<p class="font-body-sm text-body-sm max-w-xs mb-6">
							Hãy dạo quanh xưởng và chọn cho mình một vài món đồ ưng ý nhé.
						</p>
						<button
							type="button"
							onclick={() => ui.closeCart()}
							class="px-5 py-2.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm"
						>
							Tiếp tục xem đồ
						</button>
					</div>
				{/each}
			</div>

			<div class="p-6 bg-surface-container-low space-y-4">
				<div
					class="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm"
				>
					<span>Phí vận chuyển</span>
					<span class="text-secondary font-medium">Miễn phí toàn quốc</span>
				</div>
				<div class="flex items-center justify-between text-on-surface pt-2">
					<span class="font-title-lg text-title-lg">Tạm tính</span>
					<span class="font-headline-sm text-headline-sm font-semibold text-primary-container"
						>{formatVND(cart.total)}</span
					>
				</div>
				{#if cart.items.length > 0}
					<a
						href={resolve('/cart')}
						onclick={() => ui.closeCart()}
						class="w-full py-3.5 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-label-lg text-label-lg uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-sm"
					>
						<span>Tiến hành thanh toán</span>
						<span class="material-symbols-outlined text-[18px]">lock</span>
					</a>
				{:else}
					<button
						type="button"
						disabled
						class="w-full py-3.5 bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider rounded shadow-sm opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
					>
						<span>Tiến hành thanh toán</span>
						<span class="material-symbols-outlined text-[18px]">lock</span>
					</button>
				{/if}
				<p class="font-label-sm text-[11px] text-center text-on-surface-variant/70">
					Đóng gói bằng hộp giấy tái chế &amp; bảo hiểm bể vỡ 100% khi nhận hàng.
				</p>
			</div>
		</div>
	</div>
{/if}
