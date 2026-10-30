<script lang="ts">
	import { resolve } from '$app/paths';
	import { PAYMENT_LABELS } from '$lib/checkout';
	import { formatVND } from '$lib/format';

	let { data } = $props();

	const order = $derived(data.order);

	function fmtDate(d: Date) {
		return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
	}
	function fmtTime(d: Date) {
		return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
	}
</script>

<svelte:head>
	<title>Thanh toán thành công — mộc.</title>
	<meta
		name="description"
		content="Đơn hàng mộc. đã được xưởng tiếp nhận và xác nhận."
	/>
</svelte:head>

{#if order}
	<div class="relative w-full max-w-[1320px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
		<div
			class="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"
		></div>
		<div
			class="absolute top-1/3 right-10 w-80 h-80 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none -z-10"
		></div>

		<!-- 1. Hero Confirmation & Welcoming Message -->
		<section class="max-w-3xl mx-auto text-center flex flex-col items-center">
			<div class="relative mb-6 flex items-center justify-center">
				<div
					class="w-16 h-16 rounded-full bg-secondary-container/60 flex items-center justify-center text-secondary shadow-sm"
				>
					<svg
						class="w-8 h-8 text-secondary"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 21a9 9 0 100-18 9 9 0 000 18z"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path d="M8.5 12.5l2.5 2.5 5-5" stroke-linecap="round" stroke-linejoin="round"></path>
						<path
							d="M12 7c-1.5 2-2 3.5-1 5 .8 1.2 2 .5 2-1 0-1.5-.5-2.5-1-4z"
							opacity="0.45"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</div>
				<span class="absolute -bottom-1 -right-1 flex h-4 w-4">
					<span
						class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
					></span>
					<span
						class="relative inline-flex rounded-full h-4 w-4 bg-primary text-[8px] text-on-primary items-center justify-center font-bold"
						>✓</span
					>
				</span>
			</div>

			<div class="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full mb-4">
				<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
				<span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant"
					>Đơn hàng trực tuyến xác nhận</span
				>
			</div>

			<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4">
				Cảm ơn bạn đã nương niu những món đồ mộc mạc.
			</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl mb-8">
				Đơn hàng
				<span class="font-title-lg text-primary font-semibold break-all">#{order.id}</span>
				đã được xưởng tiếp nhận. Chúng tôi đang cẩn thận chuẩn bị từng món đồ, bọc lót giấy bồi thủ công
				và sẽ sớm gói trọn hơi ấm gửi đến bạn.
			</p>

			<!-- Key Snapshot Summary Bar -->
			<div
				class="w-full bg-surface-container-low rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-left shadow-sm"
			>
				<div class="flex items-center gap-3">
					<div
						class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary"
					>
						<span class="material-symbols-outlined text-[20px]">inventory_2</span>
					</div>
					<div>
						<div
							class="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider"
						>
							Mã đơn hàng
						</div>
						<div class="font-title-lg text-title-lg text-on-surface break-all">#{order.id}</div>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary"
					>
						<span class="material-symbols-outlined text-[20px]">calendar_today</span>
					</div>
					<div>
						<div
							class="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider"
						>
							Thời gian khởi tạo
						</div>
						<div class="font-body-md text-body-md font-medium text-on-surface">
							{fmtDate(order.createdAt)} — {fmtTime(order.createdAt)}
						</div>
					</div>
				</div>
				<div class="flex items-center gap-3">
					<div
						class="w-9 h-9 rounded-lg bg-secondary-container/70 flex items-center justify-center text-on-secondary-container"
					>
						<span class="material-symbols-outlined text-[20px]">verified</span>
					</div>
					<div>
						<div
							class="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider"
						>
							Phương thức
						</div>
						<div
							class="font-body-md text-body-md font-medium text-secondary flex items-center gap-1.5"
						>
							{PAYMENT_LABELS[order.payment]}
							({order.payment === 'cod' ? 'Thanh toán khi nhận' : 'Đã thanh toán'})
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 3. Editorial Receipt & Packaging Glance Split Bento -->
		<section class="mt-14 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
			<!-- Left: Receipt Card (7 cols) -->
			<div class="lg:col-span-7 bg-surface-container-low rounded-xl p-6 sm:p-8 relative shadow-sm">
				<div class="flex items-center justify-between pb-5">
					<div>
						<span
							class="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold"
							>Phiếu gửi xưởng mộc.</span
						>
						<h3 class="font-headline-sm text-headline-sm text-on-surface mt-1">
							Danh mục vật phẩm
						</h3>
					</div>
					<span class="material-symbols-outlined text-outline-variant text-[28px]"
						>local_florist</span
					>
				</div>

				<!-- Items List -->
				<div class="flex flex-col gap-5 py-4">
					{#each order.items as item (item.id)}
						<div class="flex items-center gap-4 group">
							<div class="w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0">
								<img
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									src={item.image}
									alt={item.name}
								/>
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-start justify-between gap-2">
									<h4 class="font-title-lg text-title-lg text-on-surface truncate">{item.name}</h4>
									<span class="font-title-lg text-title-lg text-on-surface shrink-0"
										>{formatVND(item.price * item.quantity)}</span
									>
								</div>
								<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 truncate">
									{item.material} • {item.size}
								</p>
								<span class="font-label-sm text-label-sm text-on-surface-variant inline-block mt-1"
									>Số lượng: {String(item.quantity).padStart(2, '0')}</span
								>
							</div>
						</div>
					{/each}
				</div>

				<!-- Cost Breakdown -->
				<div class="pt-5 mt-3 flex flex-col gap-2.5 font-body-sm text-body-sm">
					<div class="flex justify-between text-on-surface-variant">
						<span>Tạm tính ({order.items.length} sản phẩm)</span>
						<span class="text-on-surface font-medium">{formatVND(order.subtotal)}</span>
					</div>
					<div class="flex justify-between text-on-surface-variant">
						<span>Phí vận chuyển tiêu chuẩn</span>
						<span class="text-on-surface font-medium">{formatVND(order.shippingFee)}</span>
					</div>
					<div class="flex justify-between text-on-surface-variant">
						<span>Giấy bồi &amp; Hộp quà mộc bản kèm thiệp</span>
						<span class="text-on-surface font-medium">{formatVND(order.giftFee)}</span>
					</div>
					<div class="flex justify-between items-baseline pt-4 mt-2 font-title-lg text-title-lg">
						<span class="text-on-surface font-medium">Tổng số tiền thanh toán</span>
						<div class="text-right">
							<span class="text-primary font-headline-sm text-headline-sm font-semibold"
								>{formatVND(order.total)}</span
							>
							<div class="font-label-sm text-label-sm text-secondary font-medium">
								{order.payment === 'cod'
									? 'COD — thanh toán khi nhận hàng'
									: `Đã thanh toán qua ${PAYMENT_LABELS[order.payment]}`}
							</div>
						</div>
					</div>
				</div>

				<!-- Recipient Details Sub-block -->
				<div class="mt-6 pt-5 bg-surface rounded-lg p-4">
					<div class="flex items-center gap-2 mb-2 text-on-surface font-title-lg text-title-lg">
						<span class="material-symbols-outlined text-[18px] text-primary">pin_drop</span>
						Thông tin nơi nhận hàng
					</div>
					<div class="font-body-md text-body-md text-on-surface">
						<span class="font-medium">{order.recipient.fullname}</span>
						<span class="text-on-surface-variant font-normal">| {order.recipient.phone}</span>
					</div>
					<p class="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
						{order.recipient.address}, {order.recipient.wardLabel}, {order.recipient.districtLabel},
						{order.recipient.cityLabel}.
					</p>
					{#if order.recipient.note}
						<div
							class="inline-flex items-center gap-1.5 mt-2 text-[12px] text-secondary font-medium bg-secondary-container/40 px-2 py-0.5 rounded"
						>
							<span class="material-symbols-outlined text-[14px]">call</span>
							{order.recipient.note}
						</div>
					{/if}
				</div>
			</div>

			<!-- Right: Handmade Craftsmanship Context & Packaging Note (5 cols) -->
			<div class="lg:col-span-5 flex flex-col gap-6">
				<!-- Visual Storytelling Card -->
				<div class="relative bg-surface-container rounded-xl overflow-hidden shadow-sm">
					<div class="p-6">
						<div
							class="inline-block px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded font-label-sm text-label-sm uppercase tracking-wider mb-2"
						>
							Bọc quà bằng tay
						</div>
						<h4 class="font-headline-sm text-headline-sm text-on-surface">
							Mỗi kiện hàng là một tấm lòng
						</h4>
						<p class="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
							Chúng tôi thay thế hoàn toàn xốp bong bóng bằng giấy gợn tổ ong tái sinh và rơm bện tự
							nhiên. Mỗi món gốm, món gỗ đều được kiểm tra độ hoàn thiện lần cuối trước khi thắt nút
							dây gai.
						</p>
					</div>
				</div>

				<!-- Letter from Craftsman Snippet -->
				<div class="bg-surface-container-high rounded-xl p-6 relative overflow-hidden shadow-sm">
					<div
						class="absolute -right-4 -bottom-4 text-surface-container-highest/60 select-none pointer-events-none"
					>
						<span class="material-symbols-outlined text-[120px]">format_quote</span>
					</div>
					<span
						class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold"
						>Lời nhắn từ người thợ</span
					>
					<p
						class="font-body-md text-body-md italic text-on-surface mt-3 leading-relaxed relative z-10"
					>
						"Mong rằng chiếc ly gốm thô nhám hay tấm khay gỗ ấm áp này sẽ đem lại cho góc bàn của
						bạn một khoảnh khắc thong thả giữa những bộn bề hối hả."
					</p>
					<div class="mt-4 flex items-center gap-3 relative z-10">
						<div
							class="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-headline-sm text-[14px]"
						>
							T
						</div>
						<div>
							<div class="font-title-lg text-title-lg text-on-surface leading-tight">Bác Thuận</div>
							<div class="font-body-sm text-body-sm text-on-surface-variant">
								Thợ mộc chính xưởng Bát Tràng
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 4. Post-purchase Care & Engagement -->
		<section class="mt-16 max-w-5xl mx-auto">
			<div class="text-center max-w-xl mx-auto mb-10">
				<span
					class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold"
					>Sống bền lâu cùng đồ mộc</span
				>
				<h2 class="font-headline-md text-headline-md text-on-surface mt-1">
					Cẩm nang nương niu đồ thủ công
				</h2>
				<p class="font-body-sm text-body-sm text-on-surface-variant mt-2">
					Vài lưu ý nhỏ để giữ gìn lớp men gốm và thớ gỗ tần bì càng dùng càng lên nước trầm ấm theo
					năm tháng.
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="bg-surface-container-low rounded-xl p-6 flex gap-4 items-start shadow-sm">
					<div
						class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0"
					>
						<span class="material-symbols-outlined text-[24px]">coffee</span>
					</div>
					<div>
						<h4 class="font-title-lg text-title-lg text-on-surface">Khởi đầu cùng ly gốm thô</h4>
						<p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
							Trước lần dùng trà hoặc cà phê đầu tiên, hãy tráng nhẹ ly bằng nước ấm ấm hoặc nước
							gạo đun sôi để các mao mạch đất nung được "thức dậy" và bền bỉ hơn, hạn chế ố màu tự
							nhiên.
						</p>
					</div>
				</div>
				<div class="bg-surface-container-low rounded-xl p-6 flex gap-4 items-start shadow-sm">
					<div
						class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0"
					>
						<span class="material-symbols-outlined text-[24px]">nature</span>
					</div>
					<div>
						<h4 class="font-title-lg text-title-lg text-on-surface">Dưỡng khay gỗ bằng sáp ong</h4>
						<p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
							Tránh để khay gỗ ngâm lâu trong nước hay phơi dưới nắng gắt. Sau mỗi tháng, chỉ cần
							lau một lớp mỏng dầu oliu hoặc sáp ong thiên nhiên, thớ gỗ sẽ lại óng ả và tỏa hương
							nhẹ.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- 5. Navigation Actions -->
		<section
			class="mt-14 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
		>
			<a
				class="w-full sm:w-auto px-7 py-3.5 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-lg text-label-lg transition-all shadow-sm flex items-center justify-center gap-2"
				href={resolve('/#danh-muc-san-pham')}
			>
				<span>Tiếp tục dạo xem cửa hàng</span>
				<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
			</a>
			<a
				class="w-full sm:w-auto py-3.5 text-on-surface-variant hover:text-primary font-label-lg text-label-lg underline decoration-outline-variant underline-offset-4 transition-colors"
				href={resolve('/#triet-ly')}
			>
				Đọc câu chuyện nghệ nhân
			</a>
		</section>

		<!-- 6. Studio Contact & Assistance Footer Card -->
		<section class="mt-16 max-w-4xl mx-auto bg-surface-container rounded-xl p-6 sm:p-8 shadow-sm">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
				<div class="md:col-span-8">
					<div
						class="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-1"
					>
						<span class="material-symbols-outlined text-[16px]">support_agent</span>
						Bạn cần hỗ trợ thêm về đơn hàng?
					</div>
					<h3 class="font-headline-sm text-headline-sm text-on-surface">
						Không gian trải nghiệm &amp; Xưởng mộc.
					</h3>
					<p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
						Nếu cần thay đổi giờ nhận, thêm lời chúc vào thiệp viết tay hoặc hướng dẫn thanh toán,
						xin vui lòng nhắn ngay cho xưởng. Chúng tôi luôn sẵn lòng lắng nghe.
					</p>
					<div
						class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 font-body-sm text-body-sm text-on-surface"
					>
						<a
							class="flex items-center gap-1.5 hover:text-primary transition-colors"
							href="tel:0948215888"
						>
							<span class="material-symbols-outlined text-[18px] text-primary">call</span>
							<span>Hotline: 0948 215 888</span>
						</a>
						<a
							class="flex items-center gap-1.5 hover:text-primary transition-colors"
							href="mailto:thugui@moccraft.vn"
						>
							<span class="material-symbols-outlined text-[18px] text-primary">mail</span>
							<span>thugui@moccraft.vn</span>
						</a>
					</div>
				</div>
				<div class="md:col-span-4 bg-surface-container-low p-4 rounded-lg flex flex-col gap-1.5">
					<div
						class="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider font-semibold"
					>
						Ghé thăm xưởng
					</div>
					<p class="font-body-sm text-body-sm text-on-surface leading-snug">
						24 Hàng Bạc, Hoàn Kiếm, Hà Nội
					</p>
					<span class="font-label-sm text-label-sm text-secondary mt-1"
						>Mở cửa: 09:00 - 20:30 mỗi ngày</span
					>
				</div>
			</div>
		</section>

	</div>
{:else}
	<div class="max-w-[1320px] mx-auto px-6 lg:px-12 w-full py-8 lg:py-12">
		<div class="py-24 text-center">
			<span class="material-symbols-outlined text-[48px] text-outline mb-3">receipt_long</span>
			<p class="font-headline-sm text-headline-sm text-on-surface mb-2">
				Chưa có đơn hàng vừa hoàn tất
			</p>
			<p class="font-body-md text-body-md text-on-surface-variant mb-6">
				Hãy chọn vài món đồ mộc mạc và tiến hành đặt hàng nhé.
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
{/if}
