<script lang="ts">
	let { form } = $props();
</script>

<svelte:head><title>Thanh toán — mộc.</title></svelte:head>

<main class="checkout-page">
	<a class="back" href="/cart">← Quay lại giỏ hàng</a>
	<h1>Thông tin đặt hàng</h1>

	{#if form?.success}
		<section class="result success" aria-live="polite">
			<h2>Đặt hàng thành công!</h2>
			<p>{form.message}</p>
			<a href="/">Tiếp tục mua sắm →</a>
		</section>
	{:else}
		{#if form?.error}
			<p class="error" role="alert">{form.error}</p>
		{/if}

		<form method="POST">
			<label>
				Họ tên
				<input name="name" required />
			</label>
			<label>
				Số điện thoại
				<input name="phone" type="tel" required />
			</label>
			<label>
				Địa chỉ nhận hàng
				<textarea name="address" rows="4" required></textarea>
			</label>
			<fieldset>
				<legend>Phương thức thanh toán</legend>
				<label class="option"><input type="radio" name="paymentMethod" value="COD" required /> COD</label>
				<label class="option"><input type="radio" name="paymentMethod" value="Chuyển khoản" /> Chuyển khoản</label>
			</fieldset>
			<button type="submit">Đặt hàng <span>→</span></button>
		</form>
	{/if}
</main>

<style>
	:global(body) { background: #f4f0e9; color: #252622; margin: 0; }
	.checkout-page { margin: auto; max-width: 680px; padding: 50px 32px 100px; }
	.back { color: #77766e; font: .75rem Arial, sans-serif; text-decoration: none; }
	h1 { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 400; margin: 70px 0 50px; }
	form { border-top: 1px solid #252622; display: grid; gap: 24px; padding-top: 25px; }
	label, legend { color: #77766e; font: .75rem Arial, sans-serif; }
	label { display: grid; gap: 8px; }
	input:not([type='radio']), textarea { background: transparent; border: 1px solid #d2c9bc; color: #252622; font: 1rem Georgia, 'Times New Roman', serif; padding: 12px; }
	textarea { resize: vertical; }
	fieldset { border: 0; display: grid; gap: 12px; margin: 0; padding: 0; }
	.option { align-items: center; display: flex; gap: 8px; }
	form button { background: #252622; border: 0; color: #fff; cursor: pointer; font: .78rem Arial, sans-serif; padding: 16px; text-align: left; }
	form button span { color: #e8b397; float: right; }
	.error { background: #f1d8ce; color: #8d3928; font: .8rem Arial, sans-serif; padding: 14px; }
	.result { border-top: 1px solid #252622; padding-top: 25px; }
	.result h2 { font-size: 2rem; font-weight: 400; margin: 0 0 12px; }
	.result p { font: .9rem Arial, sans-serif; }
	.result a { color: #c85a3f; font: .8rem Arial, sans-serif; }
</style>