<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import type { Product } from '$lib/types';

	let { data } = $props();
	let query = $state('');
	let selectedCategory = $state('Tất cả');
	let notice = $state('');
	let filteredProducts = $derived(
		data.products.filter(
			(product: Product) =>
				product.name.toLowerCase().includes(query.toLowerCase()) &&
				(selectedCategory === 'Tất cả' || product.category === selectedCategory)
		)
	);
	const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';
	function addToCart(product: Product) {
		cart.add(product);
		notice = `${product.name} đã được thêm vào giỏ`;
		setTimeout(() => (notice = ''), 2400);
	}
</script>

<svelte:head
	><title>mộc — những món đồ có nhịp riêng</title><meta
		name="description"
		content="Minishop thử nghiệm xây bằng SvelteKit."
	/></svelte:head
>

<header class="site-header">
	<a class="wordmark" href="/">mộc<span>.</span></a>
	<nav aria-label="Điều hướng chính">
		<a href="#catalog">Cửa hàng</a><a href="#story">Câu chuyện</a><a class="cart-link" href="/cart"
			>Giỏ hàng <strong>{cart.count}</strong></a
		>
	</nav>
</header>
<main>
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">Bộ sưu tập 01 / 2026</p>
			<h1>Đồ vật nhỏ,<br /><em>niềm vui lớn.</em></h1>
			<p class="hero-description">
				Một minishop chọn lọc những món đồ tử tế cho nhịp sống chậm, đẹp và có chủ ý.
			</p>
			<a class="text-link" href="#catalog">Khám phá sản phẩm <span>↘</span></a>
		</div>
		<div class="hero-art" aria-label="Một góc bàn với những vật dụng thủ công" role="img">
			<div class="sun"></div>
			<div class="plant"><i></i><i></i><i></i></div>
			<div class="table"></div>
			<div class="hero-cup"></div>
		</div>
	</section>
	<section class="catalog" id="catalog">
		<div class="section-heading">
			<div>
				<p class="eyebrow">Chọn theo cảm hứng</p>
				<h2>Món đồ đang chờ bạn</h2>
			</div>
			<label class="search"
				>Tìm kiếm <input bind:value={query} placeholder="Ví dụ: cốc gốm" /></label
			>
		</div>
		<div class="filters" aria-label="Lọc danh mục">
			{#each data.categories as category}<button
					class:active={selectedCategory === category}
					onclick={() => (selectedCategory = category)}>{category}</button
				>{/each}
		</div>
		<div class="product-grid">
			{#each filteredProducts as product}<article class="product-card">
					<div class="product-visual" style={`--accent: ${product.accent}`}>
						<span>{product.category}</span>
						<div class="product-shape"></div>
					</div>
					<div class="product-info">
						<div>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
						</div>
						<strong>{formatPrice(product.price)}</strong>
					</div>
					<button class="add-button" onclick={() => addToCart(product)}
						>Thêm vào giỏ <span>+</span></button
					>
				</article>{:else}<p class="empty">Không tìm thấy món đồ phù hợp.</p>{/each}
		</div>
	</section>
	<section class="story" id="story">
		<p class="eyebrow">Triết lý của mộc</p>
		<p class="story-text">
			Chúng tôi tin những món đồ tốt không cần ồn ào. Chúng hiện diện vừa đủ, dùng lâu, và khiến một
			ngày bình thường trở nên đáng nhớ.
		</p>
	</section>
</main>
{#if notice}<div class="toast" role="status">{notice} <a href="/cart">Xem giỏ hàng →</a></div>{/if}

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		background: #f4f0e9;
		color: #252622;
		font-family: Georgia, 'Times New Roman', serif;
	}
	:global(button),
	:global(input) {
		font: inherit;
	}
	.site-header {
		align-items: center;
		display: flex;
		justify-content: space-between;
		max-width: 1180px;
		margin: auto;
		padding: 28px 32px;
	}
	.wordmark {
		color: inherit;
		font-size: 2rem;
		text-decoration: none;
	}
	.wordmark span {
		color: #c85a3f;
	}
	nav {
		align-items: center;
		display: flex;
		gap: 30px;
	}
	nav a {
		color: #5e6158;
		font:
			0.78rem Arial,
			sans-serif;
		text-decoration: none;
	}
	nav a:hover,
	.text-link:hover {
		color: #c85a3f;
	}
	.cart-link strong {
		background: #252622;
		border-radius: 50%;
		color: #fff;
		display: inline-grid;
		font-size: 0.68rem;
		height: 20px;
		place-items: center;
		margin-left: 5px;
		width: 20px;
	}
	.hero {
		display: grid;
		gap: 8vw;
		grid-template-columns: 1fr 1fr;
		margin: 70px auto 120px;
		max-width: 1180px;
		padding: 0 32px;
	}
	.hero-copy {
		padding: 50px 0;
	}
	.eyebrow {
		color: #c85a3f;
		font:
			0.68rem Arial,
			sans-serif;
		letter-spacing: 0.15em;
		text-transform: uppercase;
	}
	.hero h1 {
		font-size: clamp(3.7rem, 7vw, 6.8rem);
		font-weight: 400;
		line-height: 0.9;
		margin: 22px 0 30px;
	}
	.hero h1 em {
		color: #c85a3f;
		font-style: italic;
	}
	.hero-description {
		color: #6d6e65;
		font:
			1rem/1.7 Arial,
			sans-serif;
		max-width: 350px;
	}
	.text-link {
		color: #252622;
		display: inline-block;
		font:
			0.8rem Arial,
			sans-serif;
		margin-top: 22px;
		text-decoration: none;
	}
	.text-link span {
		color: #c85a3f;
		font-size: 1.2rem;
		margin-left: 8px;
	}
	.hero-art {
		background: #e0d7c9;
		min-height: 480px;
		overflow: hidden;
		position: relative;
	}
	.sun {
		background: #d4875e;
		border-radius: 50%;
		height: 220px;
		position: absolute;
		right: 16%;
		top: 13%;
		width: 220px;
	}
	.table {
		background: #90735b;
		bottom: 0;
		height: 36%;
		left: -5%;
		position: absolute;
		transform: rotate(-7deg);
		width: 115%;
	}
	.plant {
		bottom: 37%;
		left: 17%;
		position: absolute;
		transform: rotate(-10deg);
	}
	.plant:before {
		background: #526650;
		content: '';
		height: 160px;
		left: 35px;
		position: absolute;
		top: 22px;
		transform: rotate(5deg);
		width: 7px;
	}
	.plant i {
		background: #667d5d;
		border-radius: 100% 0 100% 0;
		display: block;
		height: 65px;
		margin: -17px 0;
		transform: rotate(25deg);
		width: 34px;
	}
	.hero-cup {
		background: #d3c3a5;
		border-radius: 8px 8px 24px 24px;
		bottom: 25%;
		height: 100px;
		position: absolute;
		right: 24%;
		transform: rotate(4deg);
		width: 100px;
	}
	.hero-cup:after {
		border: 11px solid #d3c3a5;
		border-left: 0;
		border-radius: 0 30px 30px 0;
		content: '';
		height: 35px;
		position: absolute;
		right: -29px;
		top: 24px;
		width: 25px;
	}
	.catalog {
		border-top: 1px solid #d8d0c3;
		margin: auto;
		max-width: 1180px;
		padding: 80px 32px 110px;
	}
	.section-heading {
		align-items: end;
		display: flex;
		justify-content: space-between;
	}
	.section-heading h2 {
		font-size: 2.8rem;
		font-weight: 400;
		margin: 14px 0 0;
	}
	.search {
		color: #797a71;
		font:
			0.7rem Arial,
			sans-serif;
	}
	.search input {
		background: transparent;
		border: 0;
		border-bottom: 1px solid #aaa79d;
		color: #252622;
		margin-left: 8px;
		outline: none;
		padding: 8px 0;
		width: 190px;
	}
	.filters {
		display: flex;
		gap: 10px;
		margin: 42px 0 25px;
	}
	.filters button {
		background: transparent;
		border: 1px solid #d2c9bc;
		border-radius: 30px;
		color: #77766e;
		cursor: pointer;
		font:
			0.72rem Arial,
			sans-serif;
		padding: 10px 17px;
	}
	.filters button.active,
	.filters button:hover {
		background: #252622;
		border-color: #252622;
		color: #fff;
	}
	.product-grid {
		display: grid;
		gap: 25px;
		grid-template-columns: repeat(4, 1fr);
	}
	.product-card {
		min-width: 0;
	}
	.product-visual {
		background: var(--accent);
		height: 270px;
		overflow: hidden;
		padding: 16px;
		position: relative;
	}
	.product-visual > span {
		color: #fff;
		font:
			0.62rem Arial,
			sans-serif;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.product-shape {
		background: rgba(255, 255, 255, 0.45);
		border-radius: 50%;
		height: 145px;
		left: 50%;
		position: absolute;
		top: 55%;
		transform: translate(-50%, -50%) rotate(-20deg);
		width: 145px;
	}
	.product-shape:after {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 0 0 45% 45%;
		content: '';
		height: 90px;
		left: 17px;
		position: absolute;
		top: 25px;
		width: 110px;
	}
	.product-info {
		display: flex;
		gap: 10px;
		justify-content: space-between;
		padding: 16px 0 12px;
	}
	.product-info h3 {
		font-size: 1.05rem;
		font-weight: 400;
		margin: 0 0 6px;
	}
	.product-info p {
		color: #7c7c73;
		font:
			0.72rem/1.4 Arial,
			sans-serif;
		margin: 0;
	}
	.product-info strong {
		font:
			0.76rem Arial,
			sans-serif;
		white-space: nowrap;
	}
	.add-button {
		background: transparent;
		border: 0;
		border-bottom: 1px solid #aaa79d;
		color: #45463e;
		cursor: pointer;
		display: flex;
		font:
			0.72rem Arial,
			sans-serif;
		justify-content: space-between;
		padding: 10px 0;
		width: 100%;
	}
	.add-button span {
		color: #c85a3f;
		font-size: 1.2rem;
		line-height: 0.7;
	}
	.empty {
		color: #77766e;
		font:
			0.9rem Arial,
			sans-serif;
	}
	.story {
		background: #dfe4dc;
		padding: 90px max(32px, calc((100% - 800px) / 2));
	}
	.story-text {
		font-size: clamp(2rem, 4vw, 4rem);
		line-height: 1.05;
		margin: 25px 0 0;
	}
	.toast {
		background: #252622;
		bottom: 24px;
		color: #fff;
		font:
			0.8rem Arial,
			sans-serif;
		left: 50%;
		padding: 15px 20px;
		position: fixed;
		transform: translateX(-50%);
		z-index: 2;
	}
	.toast a {
		color: #e8b397;
		margin-left: 14px;
		text-decoration: none;
	}
	@media (max-width: 760px) {
		nav a:not(.cart-link) {
			display: none;
		}
		.hero {
			grid-template-columns: 1fr;
			margin: 25px auto 80px;
		}
		.hero-art {
			min-height: 340px;
		}
		.section-heading {
			align-items: start;
			flex-direction: column;
			gap: 25px;
		}
		.product-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.product-visual {
			height: 190px;
		}
		.story {
			padding: 65px 32px;
		}
	}
</style>
