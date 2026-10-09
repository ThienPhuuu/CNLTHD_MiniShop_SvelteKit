<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<footer id="footer" class="w-full bg-surface-container-low pt-16 pb-12 mt-space-2xl">
	<div class="max-w-[1320px] mx-auto px-6 lg:px-12">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
			<div class="md:col-span-4 flex flex-col items-start gap-4">
				<a
					href={resolve('/')}
					class="font-headline-md text-headline-md tracking-tight text-on-surface"
					>mộc<span class="text-primary">.</span></a
				>
				<p class="font-body-md text-body-md text-on-surface-variant max-w-sm">
					mộc. — Đồ vật nhỏ cho đời sống hằng ngày. Tuyển tập những sản phẩm thủ công tinh giản,
					nâng niu chất liệu mộc bản và hơi ấm của đôi bàn tay người thợ Việt.
				</p>
				<div class="flex items-center gap-3 pt-2 text-on-surface-variant">
					<span class="font-label-sm text-label-sm uppercase tracking-widest"
						>Xưởng gốm &amp; mộc</span
					>
					<span class="w-1 h-1 rounded-full bg-outline-variant"></span>
					<span class="font-label-sm text-label-sm text-on-surface-variant"
						>Hội An &amp; Bát Tràng</span
					>
				</div>
			</div>
			<div class="md:col-span-2 flex flex-col gap-3">
				<span
					class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold"
					>Danh mục</span
				>
				<a
					href={resolve('/#danh-muc-san-pham')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Gốm men thô</a
				>
				<a
					href={resolve('/#danh-muc-san-pham')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Gỗ mộc nguyên khối</a
				>
				<a
					href={resolve('/#danh-muc-san-pham')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Dệt thoi tự nhiên</a
				>
				<a
					href={resolve('/#danh-muc-san-pham')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Mùi hương thảo mộc</a
				>
			</div>
			<div class="md:col-span-2 flex flex-col gap-3">
				<span
					class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold"
					>Đồng hành</span
				>
				<a
					href={resolve('/#triet-ly')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Về mộc.</a
				>
				<a
					href={resolve('/#triet-ly')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Thư xưởng</a
				>
				<a
					href={resolve('/#footer')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Giao nhận &amp; Bảo hành</a
				>
				<a
					href={resolve('/#footer')}
					class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
					>Ghé thăm xưởng</a
				>
			</div>
			<div class="md:col-span-4 flex flex-col gap-4">
				<span
					class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold"
					>Nhận thư từ mộc.</span
				>
				<p class="font-body-sm text-body-sm text-on-surface-variant">
					Mỗi tuần một câu chuyện nhỏ về nghề thủ công, các mẻ gốm mới ra lò và những góc nhìn tĩnh
					lặng cho tổ ấm.
				</p>
				<form class="flex items-center gap-2 pt-1" onsubmit={(event) => event.preventDefault()}>
					<label class="sr-only" for="newsletter-email">Địa chỉ thư điện tử</label>
					<input
						class="flex-1 bg-surface px-4 py-2 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface-container-lowest transition-colors"
						id="newsletter-email"
						placeholder="Địa chỉ thư điện tử của bạn..."
						type="email"
					/>
					<button
						type="submit"
						class="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-sm text-label-sm uppercase rounded-lg transition-colors shrink-0"
						>Gửi</button
					>
				</form>
			</div>
		</div>
		<div
			class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant"
		>
			<p>© 2025 mộc. bản quyền thủ công. Lưu giữ từng nếp sống chậm.</p>
			<div class="flex items-center gap-6">
				<a href={resolve('/#footer')} class="hover:text-on-surface transition-colors"
					>Quyền riêng tư</a
				>
				<a href={resolve('/#footer')} class="hover:text-on-surface transition-colors">Điều khoản</a>
			</div>
		</div>
	</div>
</footer>
