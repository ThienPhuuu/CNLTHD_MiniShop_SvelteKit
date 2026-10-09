<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { cart } from '$lib/cart.svelte';
	import { ui } from '$lib/ui.svelte';
	import { formatVND } from '$lib/format';
	import type { Product } from '$lib/types';

	let { product, related }: { product: Product; related: Product[] } = $props();

	let images = $derived(product.gallery ?? [product.image]);
	let originParts = $derived(product.origin.split(' · '));
	let isCeramic = $derived(product.categoryId === 'gom');

	const glazes = [
		{ short: 'Men tro củi', full: 'Men tro củi tự nhiên', swatch: 'bg-secondary' },
		{ short: 'Đất nung mộc', full: 'Men đất nung mộc', swatch: 'bg-primary-container' },
		{ short: 'Rêu sương', full: 'Men rêu phong sương', swatch: 'bg-tertiary' }
	];

	const steps = [
		{
			no: 'Bước 01',
			title: 'Vuốt tay định hình',
			text: 'Khối đất phù sa sông Hồng được lọc tạp chất kỹ lưỡng qua 4 bể lắng, sau đó được người thợ cả chuốt tay từng chiếc trên bàn xoay truyền thống, tạo gờ cầm tự nhiên ôm khít lòng bàn tay.',
			img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfry2Q4EVU1crb7Yc9L468g3RkVD-QvXqbvXt2B8Tqg_M5JYarWVwPt9034tr5sBEXOa1faQ1i_DJz5kkq3PqmSrL48kFK59jpcjrHr1Q3ZsMGPNK0o9kl6vopo9buJ9_BNM2niDOnkeSCTaFgd3NgWp1aoub8dsI7047OUn_pcnLZlJDONLjpozpI8dBsnAkbnmy1pvLMRj90P4mtiDT_DqW99Ouedcx3QwxHsLrnxRIBd5FzG0RC'
		},
		{
			no: 'Bước 02',
			title: 'Hong sương & Nhúng men tro',
			text: 'Sản phẩm được hong khô tự nhiên dưới bóng râm và gió trời trong 7 ngày để tránh co ngót đột ngột. Men được pha chế hoàn toàn từ tro rơm, tro gỗ nhãn và bột đá tự nhiên.',
			img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWild3s8euCjElKV2j6yL7-qOfzBkMmICRDeT2unra69bPRzE2JfVCtYcHNgML35BV0CGMqzN629OvCyCbcXi-L5RKL4ev2WjcMCPDdG2sEOzFsWjQILkAT98YAsAn-kSimXAA_nPeaAxTG-rejvUlBDWSSsWVH5ZLzvEf4hNa4fMNDikGSSLDIz-Tum2kxD4wy80Q5mh1QtBi503eFqpxHP-iMvIlBAOvhg-T9iHZJFAO8bzaLsZG'
		},
		{
			no: 'Bước 03',
			title: 'Nung củi lửa già 1250°C',
			text: 'Xếp cẩn thận vào lò bầu, nung liên tục 18 giờ bằng củi thông già. Lửa và tàn tro bay lượn ngẫu nhiên kết tinh trên thân gốm, tạo nên lớp men biến ảo không thể sao chép bằng lò điện.',
			img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ80sSw0-luf5BqWIv_VjFXkL36Aw4518F3Q22Kq_6sifynHD_1cl8UJKZjhi82PTvfyncHNMwZBQqAni3IZZ5FlgwloGT6fwt5QVTo9KVAUjFAedOjTpCOlq8sv-LXJu8UM3mHL9ypuXg6cKNDvUTaFF5Vy3Ys5yrJxqYBNuoKzVxHy_E6rGCNcYrS-v3v5FTYy6K-fAGW9ucDb4pcNcMywypKfYVhalvYEaOBZxUlf3blv79qCfA'
		}
	];

	const reviews = [
		{
			name: 'Minh Thảo',
			meta: 'Hà Nội · Đã mua mẻ tháng 10',
			text: '"Cầm ly gốm trên tay cảm nhận rõ độ đầm và các đường vân tay người thợ. Pha trà mạn buổi sáng uống thấy đượm vị hẳn, góc làm việc thêm một chút tĩnh lặng rất đáng quý."'
		},
		{
			name: 'Hoàng Khang',
			meta: 'Đà Lạt · Đã mua mẻ tháng 11',
			text: '"Đóng gói rất chu đáo, dùng giấy tổ ong và dây gai tự nhiên không có một hạt xốp nào. Chiếc ly men tro màu sắc trầm mặc đúng ý mình tìm kiếm lâu nay."'
		},
		{
			name: 'Lan Anh',
			meta: 'TP. Hồ Chí Minh · Đã mua',
			text: '"Dung tích 220ml rất chuẩn, rót cà phê phin uống từ từ vẫn giữ ấm tay. Sẽ ủng hộ xưởng thêm bộ dĩa và bình gốm mộc trong tương lai."'
		}
	];

	let activeIndex = $state(0);
	let activeImage = $derived(images[activeIndex]);
	let quantity = $state(1);
	let glazeIndex = $state(0);
	let wishlisted = $state(false);

	function addToCart() {
		cart.add(product, quantity);
		ui.showToast(`Đã thêm ${quantity}× ${product.name} vào giỏ hàng`);
	}

	function buyNow() {
		cart.add(product, quantity);
		ui.showToast(`Đã thêm ${quantity}× ${product.name} vào giỏ hàng`);
		goto(resolve('/cart'));
	}

	function toggleWishlist() {
		wishlisted = !wishlisted;
		ui.showToast(wishlisted ? 'Đã lưu vào danh sách yêu thích' : 'Đã bỏ khỏi danh sách yêu thích');
	}
</script>

{#snippet stars()}
	<div class="flex items-center text-primary">
		{#each [1, 2, 3, 4, 5] as star (star)}
			<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;"
				>star</span
			>
		{/each}
	</div>
{/snippet}

<!-- BREADCRUMB & BACK LINK -->
<section class="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-6">
	<div class="flex items-center justify-between">
		<nav class="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
			<a class="hover:text-primary transition-colors" href={resolve('/')}>Trang chủ</a>
			<span class="text-outline-variant">/</span>
			<a class="hover:text-primary transition-colors" href={resolve('/#danh-muc-san-pham')}
				>{product.category}</a
			>
			<span class="text-outline-variant">/</span>
			<span class="text-on-surface font-medium">{product.name}</span>
		</nav>
		<a
			class="group inline-flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
			href={resolve('/#danh-muc-san-pham')}
		>
			<span
				class="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform"
				>arrow_back</span
			>
			<span>Quay lại cửa hàng</span>
		</a>
	</div>
</section>

<!-- PRODUCT SHOWCASE 2-COLUMNS -->
<section class="max-w-[1320px] w-full mx-auto px-6 lg:px-12 pb-24">
	<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
		<!-- CỘT TRÁI: THƯ VIỆN HÌNH ẢNH -->
		<div class="lg:col-span-7 flex flex-col gap-6">
			<div
				class="relative w-full aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3.8] rounded-xl overflow-hidden bg-surface-container shadow-sm group"
			>
				<img
					class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
					src={activeImage}
					alt={product.name}
				/>
				<div
					class="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm"
				>
					<span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
					<span class="font-label-sm text-label-sm text-on-surface tracking-widest uppercase"
						>{product.artisan} · Độc bản</span
					>
				</div>
				<a
					class="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface transition-colors shadow-sm"
					href={activeImage}
					target="_blank"
					rel="external noreferrer"
					title="Phóng to ảnh"
					aria-label="Phóng to ảnh"
				>
					<span class="material-symbols-outlined text-[18px]">zoom_in</span>
				</a>
			</div>

			{#if images.length > 1}
				<div class="grid grid-cols-4 gap-3 sm:gap-4">
					{#each images as image, index (image)}
						<button
							type="button"
							onclick={() => (activeIndex = index)}
							aria-label={`Xem ảnh ${index + 1}`}
							class="relative aspect-square rounded-lg overflow-hidden bg-surface-container shadow-sm transition-all {activeIndex ===
							index
								? 'ring-2 ring-primary'
								: 'hover:opacity-90'}"
						>
							<img
								class="w-full h-full object-cover"
								src={image}
								alt={`${product.name} — ảnh ${index + 1}`}
								loading="lazy"
							/>
						</button>
					{/each}
				</div>
			{/if}

			{#if isCeramic}
				<div
					class="bg-surface-container-low rounded-xl p-5 sm:p-6 shadow-sm flex items-start gap-4"
				>
					<div
						class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0"
					>
						<span class="material-symbols-outlined text-[20px]">local_fire_department</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="font-title-lg text-title-lg text-on-surface"
							>Biến ảo tự nhiên của lửa &amp; khoáng thạch</span
						>
						<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
							Mỗi mẻ nung củi đều mang dấu ấn riêng biệt: vệt vân lửa ram rám, đốm quặng sắt tự
							nhiên và độ chuyển màu men tro phụ thuộc vào nhiệt lượng từng góc lò. Không chiếc nào
							trùng lặp hoàn toàn—chiếc ly bạn cầm trên tay chính là tác phẩm độc bản.
						</p>
					</div>
				</div>
			{/if}
		</div>

		<!-- CỘT PHẢI: THÔNG TIN & TRẢI NGHIỆM CHỌN MUA -->
		<div class="lg:col-span-5 flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<span
						class="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold"
						>{originParts[0]}</span
					>
					<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
					<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"
						>{originParts[1] ?? ''}</span
					>
				</div>
				<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">
					{product.name}
				</h1>
				{#if isCeramic}
					<div class="flex items-center gap-3 pt-1">
						{@render stars()}
						<span class="font-label-sm text-label-sm font-semibold text-on-surface">5.0</span>
						<span class="text-outline-variant">·</span>
						<a
							class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant underline-offset-4"
							href="#danh-gia">28 lời khen mộc mạc</a
						>
					</div>
				{/if}
			</div>

			<!-- Price & Inventory -->
			<div
				class="bg-surface-container rounded-xl p-4 sm:p-5 flex items-baseline justify-between gap-3 shadow-sm"
			>
				<div class="flex items-baseline gap-3">
					<span class="font-headline-md text-headline-md text-primary font-medium tracking-tight"
						>{formatVND(product.price)}</span
					>
					{#if product.oldPrice}
						<span class="font-body-sm text-body-sm text-on-surface-variant line-through"
							>{formatVND(product.oldPrice)}</span
						>
					{/if}
				</div>
				<span
					class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm shadow-sm"
				>
					<span class="w-2 h-2 rounded-full bg-secondary"></span>
					Còn {product.stock} sản phẩm trong xưởng
				</span>
			</div>

			<!-- Editorial Story Excerpt -->
			<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
				{product.detail}
			</p>

			<!-- Glaze Selection -->
			{#if isCeramic}
				<div class="flex flex-col gap-3 pt-2">
					<div class="flex items-center justify-between">
						<span class="font-label-lg text-label-lg text-on-surface">Sắc độ men thủ công:</span>
						<span
							class="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider"
							>{glazes[glazeIndex].full}</span
						>
					</div>
					<div class="grid grid-cols-3 gap-3">
						{#each glazes as glaze, index (glaze.short)}
							<button
								type="button"
								onclick={() => (glazeIndex = index)}
								class="flex flex-col items-center gap-2 p-3 rounded-lg bg-surface-container-low transition-all text-left shadow-sm {glazeIndex ===
								index
									? 'ring-2 ring-primary'
									: 'hover:bg-surface-container'}"
							>
								<div class="w-8 h-8 rounded-full {glaze.swatch} shadow-inner"></div>
								<span class="font-label-sm text-label-sm text-on-surface text-center"
									>{glaze.short}</span
								>
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Specifications Spec Sheet -->
			<div class="bg-surface-container-low rounded-xl p-4 flex flex-col gap-2.5 shadow-sm">
				<div class="flex items-center justify-between gap-4 text-body-sm font-body-sm">
					<span class="text-on-surface-variant shrink-0">Chất liệu</span>
					<span class="font-medium text-on-surface text-right">{product.material}</span>
				</div>
				<div class="flex items-center justify-between gap-4 text-body-sm font-body-sm">
					<span class="text-on-surface-variant shrink-0">Kích thước</span>
					<span class="font-medium text-on-surface text-right">{product.size}</span>
				</div>
			</div>

			<!-- Quantity & Action Buttons -->
			<div class="flex flex-col gap-3 pt-2">
				<div class="flex items-center gap-3">
					<div
						class="inline-flex items-center rounded-lg bg-surface-container p-1 shadow-sm shrink-0"
					>
						<button
							type="button"
							aria-label="Giảm số lượng"
							onclick={() => (quantity = Math.max(1, quantity - 1))}
							class="w-9 h-9 rounded-md flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
						>
							<span class="material-symbols-outlined text-[18px]">remove</span>
						</button>
						<span class="w-10 text-center font-label-lg text-label-lg text-on-surface"
							>{quantity}</span
						>
						<button
							type="button"
							aria-label="Tăng số lượng"
							onclick={() => (quantity += 1)}
							class="w-9 h-9 rounded-md flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
						>
							<span class="material-symbols-outlined text-[18px]">add</span>
						</button>
					</div>
					<button
						type="button"
						onclick={addToCart}
						class="flex-1 py-3.5 px-6 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
					>
						<span class="material-symbols-outlined text-[20px]">shopping_bag</span>
						<span>Thêm vào giỏ hàng</span>
					</button>
					<button
						type="button"
						onclick={toggleWishlist}
						title="Lưu tác phẩm"
						aria-pressed={wishlisted}
						class="w-12 h-12 rounded-lg bg-surface-container hover:bg-surface-container-high {wishlisted
							? 'text-primary'
							: 'text-on-surface-variant'} flex items-center justify-center transition-colors shadow-sm shrink-0"
					>
						<span
							class="material-symbols-outlined text-[22px]"
							style="font-variation-settings: 'FILL' {wishlisted ? 1 : 0};"
							>{wishlisted ? 'favorite' : 'favorite_border'}</span
						>
					</button>
				</div>
				<button
					type="button"
					onclick={buyNow}
					class="w-full py-3 px-6 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-lg text-label-lg uppercase tracking-wider transition-colors shadow-sm"
				>
					Mua ngay · Nhận hàng sau 2-3 ngày
				</button>
			</div>

			<!-- Trust & Workshop Promises -->
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
				<div class="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low shadow-sm">
					<span class="material-symbols-outlined text-secondary text-[20px] shrink-0">eco</span>
					<span class="font-body-sm text-[12px] leading-tight text-on-surface-variant"
						>Đóng gói 100% sinh học không rác nhựa</span
					>
				</div>
				<div class="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low shadow-sm">
					<span class="material-symbols-outlined text-secondary text-[20px] shrink-0"
						>verified_user</span
					>
					<span class="font-body-sm text-[12px] leading-tight text-on-surface-variant"
						>Đổi mới miễn phí nếu nứt vỡ khi vận chuyển</span
					>
				</div>
				<div class="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low shadow-sm">
					<span class="material-symbols-outlined text-secondary text-[20px] shrink-0"
						>local_shipping</span
					>
					<span class="font-body-sm text-[12px] leading-tight text-on-surface-variant"
						>Giao an toàn tận tay toàn quốc</span
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- WORKSHOP & ARTISAN STORY -->
{#if isCeramic}
	<section class="w-full bg-surface-container-low py-20">
		<div class="max-w-[1320px] w-full mx-auto px-6 lg:px-12 flex flex-col gap-16">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
				<div class="lg:col-span-8 flex flex-col gap-3">
					<span
						class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold"
						>Hơi thở từ lòng lò nung củi</span
					>
					<h2 class="font-headline-lg text-headline-lg text-on-surface">
						Câu chuyện người thợ &amp; Hành trình tạo hình chiếc ly
					</h2>
					<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl pt-1">
						Mỗi mẻ gốm tại mộc. không ra đời từ dây chuyền công nghiệp. Đó là sự kiên nhẫn tích lũy
						từ đôi tay lấm lem bùn đất, nhịp xoay đều của bàn chuốt cổ và ngọn lửa nung củi bập bùng
						suốt canh thâu.
					</p>
				</div>
				<div class="lg:col-span-4 flex lg:justify-end">
					<div class="p-4 rounded-xl bg-surface shadow-sm flex items-center gap-3">
						<div
							class="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0"
						>
							<span class="material-symbols-outlined text-[24px]">palette</span>
						</div>
						<div>
							<p class="font-label-lg text-label-lg text-on-surface">Bác Bùi Văn Toàn</p>
							<p class="font-body-sm text-body-sm text-on-surface-variant">
								36 năm giữ lửa gốm men Bát Tràng
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each steps as step (step.no)}
					<div class="flex flex-col gap-5 bg-surface rounded-xl p-6 shadow-sm">
						<div
							class="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container"
						>
							<img
								class="w-full h-full object-cover"
								src={step.img}
								alt={step.title}
								loading="lazy"
							/>
							<span
								class="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-md"
								>{step.no}</span
							>
						</div>
						<div class="flex flex-col gap-2">
							<h3 class="font-headline-sm text-headline-sm text-on-surface">{step.title}</h3>
							<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
								{step.text}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- PAIRED ITEMS (MÓN ĐỒ HOÀN HẢO KHI ĐI CÙNG) -->
<section class="max-w-[1320px] w-full mx-auto px-6 lg:px-12 py-24">
	<div class="flex flex-col gap-10">
		<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
			<div>
				<span
					class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold"
					>Gợi ý bài trí góc an yên</span
				>
				<h2 class="font-headline-md text-headline-md text-on-surface pt-1">
					Món đồ hoàn hảo khi đi cùng
				</h2>
			</div>
			<a
				class="group inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-primary hover:text-primary-container transition-colors"
				href={resolve('/#danh-muc-san-pham')}
			>
				<span>Xem tất cả sản phẩm</span>
				<span
					class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
					>arrow_forward</span
				>
			</a>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each related as item (item.id)}
				<div
					class="group flex flex-col bg-surface-container-low rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
				>
					<div
						class="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container mb-4"
					>
						<img
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							src={item.image}
							alt={item.name}
							loading="lazy"
						/>
						<span
							class="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-md"
							>{item.category}</span
						>
					</div>
					<div class="flex flex-col gap-1">
						<div class="flex items-center justify-between gap-2">
							<h3
								class="font-title-lg text-title-lg text-on-surface group-hover:text-primary transition-colors"
							>
								<a href={resolve(`/san-pham/${item.id}`)}>{item.name}</a>
							</h3>
							<span class="font-label-lg text-label-lg text-primary font-semibold whitespace-nowrap"
								>{formatVND(item.price)}</span
							>
						</div>
						<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
							{item.description}
						</p>
					</div>
					<div class="pt-4 mt-auto flex items-center justify-between">
						<span class="font-label-sm text-label-sm text-secondary flex items-center gap-1">
							<span class="material-symbols-outlined text-[16px]">check_circle</span>
							Còn {item.stock} sản phẩm
						</span>
						<button
							type="button"
							onclick={() => {
								cart.add(item);
								ui.showToast(`Đã thêm "${item.name}" vào giỏ hàng`);
							}}
							class="px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1"
						>
							<span class="material-symbols-outlined text-[16px]">add</span>
							<span>Mua kèm</span>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- REVIEWS -->
{#if isCeramic}
	<section class="w-full bg-surface-container py-16 scroll-mt-20" id="danh-gia">
		<div class="max-w-[1320px] w-full mx-auto px-6 lg:px-12 flex flex-col gap-10">
			<div class="flex items-center justify-between gap-4">
				<div>
					<span
						class="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold"
						>Trải nghiệm thực tế</span
					>
					<h2 class="font-headline-sm text-headline-sm text-on-surface pt-1">
						Cảm nhận từ người cùng nếp sống
					</h2>
				</div>
				<button
					type="button"
					onclick={() => ui.showToast('Cảm ơn bạn — biểu mẫu gửi cảm nghĩ sẽ sớm ra mắt')}
					class="px-4 py-2 rounded-lg bg-surface text-on-surface hover:bg-surface-container-lowest font-label-sm text-label-sm tracking-wide shadow-sm transition-colors shrink-0"
				>
					Gửi cảm nghĩ của bạn
				</button>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each reviews as review (review.name)}
					<div class="bg-surface rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4">
						<div class="flex flex-col gap-3">
							{@render stars()}
							<p class="font-body-md text-body-md text-on-surface italic">{review.text}</p>
						</div>
						<div class="flex items-center justify-between pt-2">
							<span class="font-label-sm text-label-sm font-semibold text-on-surface"
								>{review.name}</span
							>
							<span class="font-body-sm text-body-sm text-on-surface-variant">{review.meta}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
