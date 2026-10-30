<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { cart } from '$lib/cart.svelte';
	import { COUPON_CODE, COUPON_MIN, COUPON_VALUE, GIFT_FEE, SHIPPING_FEE } from '$lib/checkout';
	import { formatVND } from '$lib/format';

	const inputClass =
		'w-full bg-surface-container-lowest border border-outline-variant/60 rounded px-3.5 py-2.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-on-surface transition-colors';
	const selectClass =
		'w-full bg-surface-container-lowest border border-outline-variant/60 rounded px-3 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:border-on-surface transition-colors';

	let fullname = $state('');
	let phone = $state('');
	let email = $state('');
	let city = $state('HCM');
	let district = $state('Q3');
	let ward = $state('P6');
	let address = $state('');
	let note = $state('');

	const shipping = 'standard';
	let couponCode = $state('MOCBANMOI');
	let couponApplied = $state(false);
	let couponError = $state('');
	let orderState = $state<'idle' | 'loading'>('idle');
	let submitError = $state('');

	let subtotal = $derived(cart.total);
	let shippingFee = $derived(SHIPPING_FEE[shipping]);
	let couponValid = $derived(couponApplied && subtotal >= COUPON_MIN);
	let discount = $derived(couponValid ? COUPON_VALUE : 0);
	let total = $derived(subtotal + shippingFee + GIFT_FEE - discount);

	let cartLinesJSON = $derived(
		JSON.stringify(cart.items.map((item) => ({ id: item.id, quantity: item.quantity })))
	);
	let couponAppliedFlag = $derived(couponValid ? 'true' : '');

	function applyCoupon() {
		if (couponCode.trim().toUpperCase() !== COUPON_CODE) {
			couponApplied = false;
			couponError = 'Mã ưu đãi không tồn tại. Thử mã MOCBANMOI nhé.';
			return;
		}
		if (subtotal < COUPON_MIN) {
			couponApplied = false;
			couponError = `Đơn hàng tối thiểu ${formatVND(COUPON_MIN)} mới dùng mã này.`;
			return;
		}
		couponError = '';
		couponApplied = true;
	}

	const handleEnhance: SubmitFunction = () => {
		orderState = 'loading';
		submitError = '';
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				orderState = 'idle';
				submitError =
					String((result.data as { error?: string } | undefined)?.error ?? '') ||
					'Không thể xác nhận đơn hàng. Vui lòng thử lại.';
			} else if (result.type === 'error') {
				orderState = 'idle';
				submitError = 'Mất kết nối đến xưởng. Vui lòng thử lại sau ít phút.';
			} else if (result.type === 'redirect') {
				cart.clear();
				await update();
			}
		};
	};
</script>

<svelte:head>
	<title>Thông tin giao nhận &amp; Thanh toán — mộc.</title>
	<meta
		name="description"
		content="Hoàn tất đơn hàng mộc. — thông tin người nhận, địa chỉ giao hàng, vận chuyển và hình thức thanh toán."
	/>
</svelte:head>

{#if cart.items.length === 0}
	<div class="max-w-[1320px] mx-auto px-6 lg:px-12 w-full py-8 lg:py-12">
		<div class="py-24 text-center">
			<span class="material-symbols-outlined text-[48px] text-outline mb-3">shopping_bag</span>
			<p class="font-headline-sm text-headline-sm text-on-surface mb-2">Giỏ hàng đang trống</p>
			<p class="font-body-md text-body-md text-on-surface-variant mb-6">
				Hãy chọn vài món đồ mộc mạc trước khi thanh toán nhé.
			</p>
			<a
				href={resolve('/#danh-muc-san-pham')}
				class="inline-flex items-center gap-2 px-6 py-3 rounded bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider transition-colors"
			>
				<span>Khám phá cửa hàng</span>
				<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
			</a>
		</div>
	</div>
{:else}
	<div class="max-w-[1320px] mx-auto px-6 lg:px-12 w-full py-8 lg:py-12">
		<!-- Header & Stepper -->
		<div
			class="mb-10 pb-6 border-b border-surface-container-highest flex flex-col md:flex-row md:items-center justify-between gap-4"
		>
			<div>
				<span
					class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold"
					>Quy trình hoàn tất đơn</span
				>
				<h1 class="font-headline-md text-headline-md text-on-surface mt-1">
					Thông tin giao nhận &amp; Thanh toán
				</h1>
			</div>
			<nav
				aria-label="Tiến trình đặt hàng"
				class="flex items-center gap-3 text-on-surface-variant font-label-sm text-label-sm"
			>
				<a
					class="flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors"
					href={resolve('/cart')}
				>
					<span
						class="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[11px] font-bold"
						>✓</span
					>
					<span>1. Giỏ hàng</span>
				</a>
				<span class="text-outline-variant">/</span>
				<div class="flex items-center gap-1.5 text-primary font-semibold">
					<span
						class="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px]"
						>2</span
					>
					<span>2. Thông tin &amp; Đặt hàng</span>
				</div>
				<span class="text-outline-variant">/</span>
				<div class="flex items-center gap-1.5 text-on-surface-variant opacity-60">
					<span
						class="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center text-[11px]"
						>3</span
					>
					<span>3. Hoàn tất</span>
				</div>
			</nav>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
			<!-- LEFT: FORM -->
			<div class="lg:col-span-7 flex flex-col gap-10">
				<form
					class="flex flex-col gap-10"
					id="checkout-form"
					method="POST"
					action="?/place"
					use:enhance={handleEnhance}
				>
					<input type="hidden" name="items" value={cartLinesJSON} />
					<input type="hidden" name="coupon" value={couponCode} />
					<input type="hidden" name="coupon_applied" value={couponAppliedFlag} />
					<!-- 01. Contact -->
					<section
						class="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
					>
						<div
							class="flex items-baseline justify-between border-b border-surface-container-highest pb-3"
						>
							<div class="flex items-center gap-3">
								<span class="font-headline-sm text-headline-sm text-primary">01.</span>
								<h2 class="font-title-lg text-title-lg text-on-surface">Thông tin người nhận</h2>
							</div>
							<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider"
								>Thông báo đơn qua SMS/Email</span
							>
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div class="sm:col-span-2 flex flex-col gap-1.5">
								<label
									class="font-label-sm text-label-sm text-on-surface font-semibold"
									for="fullname">Họ và tên người nhận *</label
								>
								<input
									class={inputClass}
									id="fullname"
									name="fullname"
									placeholder="Nguyễn Thu An"
									required
									type="text"
									bind:value={fullname}
								/>
							</div>
							<div class="flex flex-col gap-1.5">
								<label class="font-label-sm text-label-sm text-on-surface font-semibold" for="phone"
									>Số điện thoại *</label
								>
								<input
									class={inputClass}
									id="phone"
									name="phone"
									placeholder="0901 234 567"
									required
									type="tel"
									bind:value={phone}
								/>
							</div>
							<div class="flex flex-col gap-1.5">
								<label class="font-label-sm text-label-sm text-on-surface font-semibold" for="email"
									>Email nhận cập nhật xưởng *</label
								>
								<input
									class={inputClass}
									id="email"
									name="email"
									placeholder="thuan.nguyen@email.com"
									required
									type="email"
									bind:value={email}
								/>
							</div>
						</div>
					</section>

					<!-- 02. Address -->
					<section
						class="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
					>
						<div
							class="flex items-baseline justify-between border-b border-surface-container-highest pb-3"
						>
							<div class="flex items-center gap-3">
								<span class="font-headline-sm text-headline-sm text-primary">02.</span>
								<h2 class="font-title-lg text-title-lg text-on-surface">Địa chỉ giao hàng</h2>
							</div>
							<span class="font-label-sm text-label-sm text-on-surface-variant"
								>Toàn quốc &amp; Hỏa tốc</span
							>
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<div class="flex flex-col gap-1.5">
								<label class="font-label-sm text-label-sm text-on-surface font-semibold" for="city"
									>Tỉnh / Thành phố *</label
								>
								<select class={selectClass} id="city" name="city" bind:value={city}>
									<option value="HCM">TP. Hồ Chí Minh</option>
									<option value="HN">Hà Nội</option>
									<option value="DN">Đà Nẵng</option>
									<option value="QN">Quảng Nam (Hội An)</option>
									<option value="BD">Bình Dương</option>
								</select>
							</div>
							<div class="flex flex-col gap-1.5">
								<label
									class="font-label-sm text-label-sm text-on-surface font-semibold"
									for="district">Quận / Huyện *</label
								>
								<select class={selectClass} id="district" name="district" bind:value={district}>
									<option value="Q3">Quận 3</option>
									<option value="Q1">Quận 1</option>
									<option value="BT">Bình Thạnh</option>
									<option value="PN">Phú Nhuận</option>
									<option value="TD">Thành phố Thủ Đức</option>
								</select>
							</div>
							<div class="flex flex-col gap-1.5">
								<label class="font-label-sm text-label-sm text-on-surface font-semibold" for="ward"
									>Phường / Xã *</label
								>
								<select class={selectClass} id="ward" name="ward" bind:value={ward}>
									<option value="P6">Phường Võ Thị Sáu</option>
									<option value="P2">Phường 2</option>
									<option value="P4">Phường 4</option>
									<option value="P9">Phường 9</option>
								</select>
							</div>
							<div class="sm:col-span-3 flex flex-col gap-1.5">
								<label
									class="font-label-sm text-label-sm text-on-surface font-semibold"
									for="address">Số nhà, tên đường, khu căn hộ *</label
								>
								<input
									class={inputClass}
									id="address"
									name="address"
									placeholder="Ví dụ: 48/6 Trần Quốc Thảo, Căn hộ A2-03"
									required
									type="text"
									bind:value={address}
								/>
							</div>
						</div>
					</section>

					<!-- 03. Shipping -->
					<section
						class="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
					>
						<div
							class="flex items-baseline justify-between border-b border-surface-container-highest pb-3"
						>
							<div class="flex items-center gap-3">
								<span class="font-headline-sm text-headline-sm text-primary">03.</span>
								<h2 class="font-title-lg text-title-lg text-on-surface">Phương thức vận chuyển</h2>
							</div>
							<span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider"
								>Đóng gói bền vững</span
							>
						</div>
						<input type="hidden" name="shipping_method" value="standard" />
						<div
							class="flex items-center justify-between p-4 rounded-lg bg-surface-container-lowest border-2 border-primary/90 shadow-sm"
						>
							<div class="flex items-center gap-3.5">
								<span
									class="material-symbols-outlined text-primary text-[24px]"
									aria-hidden="true">local_shipping</span
								>
								<div class="flex flex-col">
									<span class="font-label-lg text-label-lg text-on-surface font-semibold">
										Giao tiêu chuẩn
									</span>
									<span class="font-body-sm text-body-sm text-on-surface-variant">
										Thời gian 2 – 3 ngày.
									</span>
								</div>
							</div>
							<span class="font-label-lg text-label-lg text-on-surface font-semibold shrink-0"
								>{formatVND(SHIPPING_FEE.standard)}</span
							>
						</div>
					</section>

					<!-- 04. Payment -->
					<section
						class="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm"
					>
						<div
							class="flex items-baseline justify-between border-b border-surface-container-highest pb-3"
						>
							<div class="flex items-center gap-3">
								<span class="font-headline-sm text-headline-sm text-primary">04.</span>
								<h2 class="font-title-lg text-title-lg text-on-surface">Hình thức thanh toán</h2>
							</div>
						</div>
						<input type="hidden" name="payment_method" value="cod" />
						<div
							class="flex items-center justify-between p-4 rounded-lg bg-surface-container-lowest border-2 border-primary shadow-sm"
						>
							<div class="flex items-center gap-3.5">
								<span
									class="material-symbols-outlined text-primary text-[24px]"
									aria-hidden="true">local_shipping</span
								>
								<div class="flex flex-col">
									<span class="font-label-lg text-label-lg text-on-surface font-semibold"
										>Thanh toán khi nhận hàng (COD)</span
									>
									<span class="font-body-sm text-body-sm text-on-surface-variant"
										>Đồng kiểm hàng gốm, gỗ trước sự chứng kiến của người giao thư thái.</span
									>
								</div>
							</div>
						</div>
					</section>

					<!-- 05. Note -->
					<section
						class="bg-surface-container-low rounded-xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm"
					>
						<div
							class="flex items-center justify-between border-b border-surface-container-highest pb-3"
						>
							<div class="flex items-center gap-3">
								<span class="font-headline-sm text-headline-sm text-primary">05.</span>
								<h2 class="font-title-lg text-title-lg text-on-surface">
									Lời nhắn gửi riêng cho người thợ đóng gói
								</h2>
							</div>
							<span class="font-label-sm text-label-sm text-secondary font-medium"
								>Giấy dó truyền thống</span
							>
						</div>
						<p class="font-body-sm text-body-sm text-on-surface-variant">
							Nếu đây là món quà gửi tặng người thương, xưởng sẵn sàng chép tay lời chúc của bạn lên
							thiệp giấy dó Bắc Ninh mộc mạc và kẹp một nhánh hương thảo khô vào hộp.
						</p>
						<textarea
							class="{inputClass} resize-y"
							name="note"
							placeholder="Nhập lời chúc viết tay hoặc căn dặn đặc biệt khi giao (Ví dụ: Giao sau 17h, viết lời chúc mừng sinh nhật lên thiệp...)"
							rows="3"
							bind:value={note}></textarea>
					</section>

					<!-- Server validation errors -->
					{#if submitError}
						<div
							class="flex items-center gap-2.5 p-3.5 rounded-lg bg-error-container/50 border border-error/20 text-error font-body-sm text-body-sm"
							role="alert"
						>
							<span class="material-symbols-outlined text-[18px] shrink-0">error</span>
							<span>{submitError}</span>
						</div>
					{/if}

					<!-- Main CTA -->
					<div class="flex flex-col gap-4 pt-2">
						<button
							type="submit"
							disabled={orderState !== 'idle'}
							class="w-full py-5 px-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group ring-2 ring-primary/30 ring-offset-2 ring-offset-surface"
						>
							{#if orderState === 'idle'}
								<span>Xác nhận đặt hàng &amp; Thanh toán — {formatVND(total)}</span>
								<span
									class="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1"
									>arrow_forward</span
								>
							{:else}
								<span
									class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
								></span>
								<span>Đang xác nhận đơn hàng...</span>
							{/if}
						</button>
						<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
							<div class="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low">
								<span class="material-symbols-outlined text-primary text-[20px]">verified_user</span
								>
								<span class="font-body-sm text-[12px] leading-tight text-on-surface"
									>Bảo hiểm nứt vỡ 100% đổi mới ngay</span
								>
							</div>
							<div class="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low">
								<span class="material-symbols-outlined text-secondary text-[20px]">eco</span>
								<span class="font-body-sm text-[12px] leading-tight text-on-surface"
									>Bao bì phân hủy sinh học không rác nhựa</span
								>
							</div>
							<div class="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low">
								<span class="material-symbols-outlined text-primary text-[20px]">lock_reset</span>
								<span class="font-body-sm text-[12px] leading-tight text-on-surface"
									>Dữ liệu mã hóa đạt chuẩn PCI-DSS</span
								>
							</div>
						</div>
					</div>
				</form>
			</div>

			<!-- RIGHT: ORDER SUMMARY -->
			<aside class="lg:col-span-5 sticky top-24 flex flex-col gap-6">
				<div class="bg-surface-container-low rounded-xl p-6 sm:p-7 shadow-sm flex flex-col gap-6">
					<div
						class="flex items-baseline justify-between border-b border-surface-container-highest pb-4"
					>
						<h3 class="font-headline-sm text-headline-sm text-on-surface">Đơn hàng của bạn</h3>
						<span
							class="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold"
							>{cart.count} món thủ công</span
						>
					</div>

					<div class="flex flex-col divide-y divide-surface-container-highest">
						{#each cart.items as item (item.id)}
							<div class="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
								<div
									class="relative w-16 h-16 rounded overflow-hidden bg-surface-container shrink-0"
								>
									<img class="w-full h-full object-cover" src={item.image} alt={item.name} />
									<span
										class="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] leading-none font-bold"
										>{item.quantity}</span
									>
								</div>
								<div class="flex-1 min-w-0">
									<h4 class="font-label-lg text-label-lg text-on-surface truncate">{item.name}</h4>
									<p class="font-body-sm text-[12px] text-on-surface-variant truncate">
										{item.size}
									</p>
									<div class="flex items-center justify-between mt-1">
										<span class="font-body-sm text-[12px] text-secondary">{item.artisan}</span>
										<span class="font-label-md text-label-lg text-on-surface font-semibold"
											>{formatVND(item.price * item.quantity)}</span
										>
									</div>
								</div>
							</div>
						{/each}
						<div
							class="py-3 flex items-center justify-between text-body-sm text-on-surface-variant"
						>
							<span class="flex items-center gap-1.5">
								<span class="material-symbols-outlined text-[16px] text-primary">card_giftcard</span
								>
								Gói quà thủ công &amp; Thiệp viết tay
							</span>
							<span class="font-label-sm text-label-sm text-on-surface font-semibold"
								>+{formatVND(GIFT_FEE)}</span
							>
						</div>
					</div>

					<!-- Coupon -->
					<div class="pt-2 border-t border-surface-container-highest flex flex-col gap-2">
						<label
							class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold"
							for="coupon-input">Mã ưu đãi nghệ nhân</label
						>
						<div class="flex items-center gap-2">
							<input
								class="flex-1 bg-surface-container-lowest border border-outline-variant/60 rounded px-3 py-2 font-label-sm text-label-sm tracking-widest text-on-surface uppercase focus:outline-none focus:border-primary transition-colors"
								id="coupon-input"
								type="text"
								placeholder="MOCBANMOI"
								bind:value={couponCode}
							/>
							<button
								type="button"
								onclick={applyCoupon}
								disabled={couponValid}
								class="px-3.5 py-2 rounded bg-surface-container-highest hover:bg-secondary-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors shrink-0 disabled:opacity-60 disabled:cursor-default"
							>
								{couponValid ? 'Đã áp dụng' : 'Áp dụng'}
							</button>
						</div>
						{#if couponValid}
							<div class="flex items-center gap-1.5 text-secondary text-[12px]">
								<span class="material-symbols-outlined text-[14px]">check_circle</span>
								<span
									>Đã trừ {formatVND(COUPON_VALUE)} cho đơn đầu tiên từ {formatVND(
										COUPON_MIN
									)}</span
								>
							</div>
						{:else if couponError}
							<div class="flex items-center gap-1.5 text-error text-[12px]">
								<span class="material-symbols-outlined text-[14px]">error</span>
								<span>{couponError}</span>
							</div>
						{/if}
					</div>

					<!-- Price Calculation -->
					<div
						class="pt-2 border-t border-surface-container-highest flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant"
					>
						<div class="flex justify-between">
							<span>Tạm tính ({cart.count} sản phẩm)</span>
							<span class="text-on-surface font-medium">{formatVND(subtotal)}</span>
						</div>
						<div class="flex justify-between">
							<span>Phí vận chuyển tiêu chuẩn</span>
							<span class="text-on-surface font-medium">{formatVND(shippingFee)}</span>
						</div>
						<div class="flex justify-between">
							<span>Phí gói quà &amp; thiệp hoa khô</span>
							<span class="text-on-surface font-medium">{formatVND(GIFT_FEE)}</span>
						</div>
						{#if discount > 0}
							<div class="flex justify-between text-primary font-medium">
								<span>Ưu đãi ({COUPON_CODE})</span>
								<span>-{formatVND(discount)}</span>
							</div>
						{/if}
						<div
							class="pt-4 border-t border-surface-container-highest flex items-baseline justify-between"
						>
							<div class="flex flex-col">
								<span class="font-title-lg text-title-lg text-on-surface font-semibold"
									>Tổng thanh toán</span
								>
								<span class="font-body-sm text-[12px] text-on-surface-variant"
									>Đã bao gồm thuế giá trị gia tăng</span
								>
							</div>
							<span class="font-headline-md text-headline-md text-primary font-semibold"
								>{formatVND(total)}</span
							>
						</div>
					</div>
				</div>

				<!-- Quote -->
				<div
					class="bg-secondary-container/40 border border-secondary-container rounded-xl p-5 flex items-start gap-4"
				>
					<span class="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5"
						>format_quote</span
					>
					<div class="flex flex-col gap-1">
						<p class="font-headline-sm text-[15px] leading-relaxed italic text-on-surface">
							“Mỗi món đồ bạn chọn là một lời khích lệ gửi đến đôi bàn tay người thợ làng nghề bản
							địa. Đồ vật sẽ đồng hành và già đi cùng nếp nhà của bạn.”
						</p>
						<span
							class="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold mt-1"
							>— Xưởng gốm &amp; mộc Hội An</span
						>
					</div>
				</div>

				<!-- Helpdesk -->
				<div
					class="px-5 py-4 rounded-lg bg-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm"
				>
					<div class="flex items-center gap-2.5">
						<span class="material-symbols-outlined text-on-surface-variant text-[20px]"
							>support_agent</span
						>
						<span>Cần tư vấn chọn kích thước &amp; màu men?</span>
					</div>
					<a
						class="font-label-sm text-label-sm text-primary hover:underline font-semibold whitespace-nowrap"
						href="tel:0908281234">090 828 1234</a
					>
				</div>
			</aside>
		</div>
	</div>
{/if}
