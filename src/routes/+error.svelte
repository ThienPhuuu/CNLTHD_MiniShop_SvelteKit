<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="min-h-screen flex flex-col items-center justify-center text-center gap-4">
	<h1 class="text-6xl font-bold">404</h1>
	<p class="text-lg">Không tìm thấy trang bạn yêu cầu.</p>
	<p class="text-sm text-gray-500">Đường dẫn: {page.url.pathname}</p>
	<a href="/" class="px-4 py-2 bg-black text-white rounded hover:opacity-90">Về trang chủ</a>
</div>