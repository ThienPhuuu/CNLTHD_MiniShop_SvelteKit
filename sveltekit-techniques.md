# SvelteKit — Kỹ thuật đã triển khai (đối chiếu `requirements.md`)

> File này liệt kê các kỹ thuật mà `requirements.md` yêu cầu và cách dự án `mộc.` đã triển khai, kèm **minh chứng code** và **giải thích cơ chế**. Mọi đoạn code đều nằm trong repo hiện tại.

## 0. Bối cảnh

- Stack: **Svelte 5 (runes) + SvelteKit (SSR mặc định) + TypeScript + Tailwind v4**, adapter: `@sveltejs/adapter-auto`.
- Luồng mua hàng: chọn sản phẩm (`Catalog`) → giỏ hàng (`cart` store) → kiểm tra thông tin (`/checkout` + **form action**) → xác nhận đơn (`/order-success`, đọc lại từ server bằng `load`).

---

## 1. Tầng 1A — Lỗi bắt buộc (đạt 3/3)

### 1.1 Reactivity của Svelte và luồng cập nhật UI; phân biệt state local / dùng chung

Svelte 5 dùng runes: `$state` cho state, `$derived` cho giá trị suy diễn, `$props` cho props từ cha.

**State LOCAL** — chỉ sống trong một component, không cần component khác đọc.

`src/lib/components/Catalog.svelte:10-19` — ô tìm kiếm và bộ lọc danh mục:

```svelte
let query = $state(''); // state local let selectedCategory = $state('all'); let filteredProducts =
$derived( // state suy diễn: chạy lại khi query/category đổi products.filter( (product) =>
(selectedCategory === 'all' || product.categoryId === selectedCategory) && (!query.trim() ||
product.name.toLowerCase().includes(query.trim().toLowerCase())) ) );
```

Khi người dùng gõ chữ hoặc bấm filter, `query`/`selectedCategory` đổi → `filteredProducts` tự tính lại → vòng `{#each filteredProducts ...}` render lại. Không cần `onMount`/gọi lại data.

`src/routes/checkout/+page.svelte:14-35` — các field form + chuỗi tính tiền:

```svelte
let shipping = $state('standard'); let subtotal = $derived(cart.total); let shippingFee =
$derived(SHIPPING_FEE[shipping]); let couponValid = $derived(couponApplied && subtotal >=
COUPON_MIN); let discount = $derived(couponValid ? COUPON_VALUE : 0); let total = $derived(subtotal
+ shippingFee + GIFT_FEE - discount);
```

Đổi phương thức vận chuyển → `shippingFee` → `total` lan truyền tức thì tới nút "Xác nhận đặt hàng — {total}".

**State DÙNG CHUNG** — nhiều component cùng đọc/ghi → đặt trong class runes được export singleton.

`src/lib/cart.svelte.ts`:

```ts
import type { CartItem, Product } from '$lib/types';

class Cart {
	items = $state<CartItem[]>([]);

	get count() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}
	get total() {
		return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
	}
	add(product: Product, quantity = 1) {
		const item = this.items.find((entry) => entry.id === product.id);
		if (item) {
			item.quantity += quantity;
			return;
		}
		this.items.push({ ...product, quantity });
	}
	// remove / decrease / clear ...
}

export const cart = new Cart();
```

Luồng dùng thật (một state, nhiều component):

| Bước                 | Ai đọc/ghi                     | File                          |
| -------------------- | ------------------------------ | ----------------------------- |
| Thêm sản phẩm        | `cart.add()` + `ui.openCart()` | `Catalog.svelte:21-25`        |
| Hiện badge số lượng  | đọc `cart.count`               | `Header.svelte`               |
| Hiện drawer giỏ hàng | đọc `cart.items`               | `CartDrawer`                  |
| Điền bên trái form   | đọc `cart.total`               | `checkout`                    |
| Xoá giỏ sau đặt      | `cart.clear()`                 | `checkout` (enhance redirect) |

`ui.svelte.ts` tương tự (drawer + toast dùng chung Header/Catalog/CartDrawer).

**Tiêu chí quyết định:** state chỉ 1 component dùng → local (`$state`); state ≥ 2 component đọc/ghi → store dùng chung.

### 1.2 Hàm `load` và cách dữ liệu đi vào page

Hàm `load` chạy **trước khi render**, ở một nơi được SvelteKit xác định:

- `+page.server.ts` → **luôn chạy trên server** (mỗi request; còn khi điều hướng client, SvelteKit gọi lại qua fetch).
- `+layout.server.ts` → tương tự cho layout.
- `+page.ts` → universal load (server khi SSR, client khi SPA).

**Minh chứng 1 — trang chủ.** `src/routes/+page.server.ts:4-11`:

```ts
import { products } from '$lib/server/catalog';

export function load() {
	const categories: Category[] = [{ id: 'all', label: 'Tất cả' }];
	for (const product of products) {
		if (!categories.some((category) => category.id === product.categoryId)) {
			categories.push({ id: product.categoryId, label: product.category });
		}
	}
	return { products, categories };
}
```

`src/routes/+page.svelte:6` và `:18` — dữ liệu vào page qua props:

```svelte
let {data} = $props(); ...
<Catalog products={data.products} categories={data.categories} />
```

`load` trả **dữ liệu** (object JS bình thường), SvelteKit serialize nó (kể cả `Date`) rồi đưa làm props `data` cho page + các component con.

**Minh chứng 2 — route có params + xử lý 404 + dữ liệu liên quan.** `src/routes/products/[id]/+page.server.ts:4-10`:

```ts
export function load({ params }) {
	const product = products.find((entry) => entry.id === params.id);
	if (!product) {
		error(404, 'Không tìm thấy sản phẩm');
	}
	const related = products.filter((entry) => entry.id !== product.id).slice(0, 3);
	return { product, related };
}
```

**Minh chứng 3 — `load` đọc query param, biến một trang vốn chỉ client thành SSR thật.** `src/routes/order-success/+page.server.ts`:

```ts
export const load: PageServerLoad = ({ url }) => {
	const id = url.searchParams.get('order');
	return { order: id ? getOrder(id) : null };
};
```

Trang `/order-success?order=MOC-XXXX` giờ render đơn **ngay trên server** (biên lai, timeline, thông tin nhận hàng) — không phụ thuộc state client.

Chi tiết page chi tiết sản phẩm còn dùng `{#key data.product.id}` để reset state local (ảnh, số lượng) khi chuyển giữa các sản phẩm liên quan.

### 1.3 Ranh giới server–client; tránh browser API ở server / lộ secret

**Module server-only và lý do.**

`src/lib/server/catalog.ts` và `src/lib/server/orders.ts` nằm trong `src/lib/server/*` — quy ước của SvelteKit: module trong `$lib/server` **không được import vào client** (SvelteKit chặn khi build). Cả 2 chỉ được import bởi các `+page.server.ts`:

- `catalog.ts` ← import trong `src/routes/+page.server.ts`, `src/routes/products/[id]/+page.server.ts`, `src/routes/checkout/+page.server.ts`.
- `orders.ts` (kho đơn hàng in-memory: `const orders = new Map<string, Order>()`) ← import trong `checkout/+page.server.ts` (lưu khi đặt) và `order-success/+page.server.ts` (đọc khi hiển thị).

Kết quả: cách tính tiền, kho đơn hàng, dữ liệu giá… là **nguồn chân lý phía server**; client chỉ nhận dữ liệu cần hiển thị. Đây chính là nơi đặt secret/database sau này mà không lo rò rỉ sang bundle client.

**Kiểm tra thực tế — không dùng browser API ở tầng server.** Grep toàn repo (`window/document/localStorage/navigator`) cho kết quả chỉ xuất hiện trong `src/html/*.html` (file thiết kế tham chiếu, không vào bundle). Code app (`src/lib`, `src/routes`) không có browser API ở module top-level.

**Dữ liệu nào load ở server, dữ liệu nào sinh ở browser:**

| Loại dữ liệu                        | Nơi sinh                           | Bằng chứng                       |
| ----------------------------------- | ---------------------------------- | -------------------------------- |
| Sản phẩm, danh mục, đơn hàng        | Server (`load`/action/`orders.ts`) | ví dụ trên                       |
| Giỏ hàng, form fields, drawer/toast | Browser (client state)             | `cart.svelte.ts`, `ui.svelte.ts` |

Hệ quả thiết kế đúng: `/checkout` khi SSR (giỏ hàng rỗng ở server) render nhánh "Giỏ hàng đang trống" (`checkout/+page.svelte:85`), sau hydration mới hiện form. `/order-success` sau khi có form action thì lấy đơn từ server nên SSR render đầy đủ.

---

## 2. Tầng 1B — các mục đã chọn (có luồng sử dụng thật)

### 2.1 Form actions cho mutation/form submit — CHỌN (luồng đặt hàng)

**Server — action `place`.** `src/routes/checkout/+page.server.ts`:

```ts
export const actions = {
	place: async ({ request }) => {
		const form = await request.formData();
		const field = (key: string) => String(form.get(key) ?? '').trim();
		const fullname = field('fullname');
		// ...đọc email, address, shipping_method, payment_method, items (JSON)...

		if (!fullname || !phone || !email || !address) {
			return fail(400, { error: 'Bạn hãy điền đầy đủ thông tin người nhận…' });
		}
		// Tính lại giá từ catalog server-only — KHÔNG tin số tiền client gửi lên
		const items: Order['items'] = [];
		let subtotal = 0;
		for (const line of lines) {
			const product = products.find((entry) => entry.id === line?.id);
			if (!product) continue;
			const quantity = Math.max(
				1,
				Math.min(Math.floor(Number(line?.quantity)) || 1, product.stock)
			);
			items.push({ ...product, quantity });
			subtotal += product.price * quantity;
		}
		// ...tính shippingFee, discount theo mã, total...
		saveOrder(order);
		redirect(303, `/order-success?order=${order.id}`);
	}
};
```

**Client — form + `use:enhance`.** `checkout/+page.svelte:157` và `:57-74`:

```svelte
<form id="checkout-form" method="POST" action="?/place" use:enhance={handleEnhance}>
	<input type="hidden" name="items" value={cartLinesJSON} />
	...
```

```ts
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
			cart.clear(); // đơn đã lưu server-side, dọn giỏ client
			await update(); // applyActionResult: SPA navigate + invalidateAll
		}
	};
};
```

**Cơ chế & kết quả:**

- `<form method="POST" action="?/place">`: đây là POST chuẩn — **chạy tốt kể cả khi tắt JavaScript**. Server trả `303 redirect` thật.
- `use:enhance` thêm **progressive enhancement**: khi có JS, form được gửi bằng `fetch` (response là JSON envelope `{type, status, data|location}`), không tải lại trang; `applyActionResult` (/`update()`) điều hướng SPA, cập nhật `$form`/`page.status`.
- `result.type` có 4 giá trị: `success` | `failure` (ứng với `fail()`) | `redirect` (ứng với `redirect()`) | `error` (lỗi mạng). Code trên xử lý cả 4.
- **Tại sao dùng action thay vì fetch thủ công**: ID của action (`?/place`) là nơi duy nhất cần chỉ định; action có sẵn validate + CSRF phía server, chuẩn hoá `redirect`/`fail` → không phải tự đoán status, và dùng chung một đường code cho cả đường no-JS lẫn đường enhance. (Câu trả lời đầy đủ ở mục 4.)

### 2.2 SSR (hoặc prerender) theo loại trang — CHỌN: SSR mặc định toàn app

- Trang chủ & chi tiết sản phẩm: `load` server lấy catalog → SSR trả HTML đầy đủ. Phù hợp trang bán hàng (SEO/microdata).
- `/order-success`: từng là trang chỉ hiển thị state client; đã chuyển thành trang SSR đọc lại đơn từ `orders.ts` theo `?order=` → **đúng tính chất "trang động"** (không thể prerender vì phụ thuộc query param + kho đơn trong bộ nhớ).
- Không dùng `prerender` vì nội dung không tĩnh; không dùng `csr=false` vì trang vẫn cần tương tác (giỏ hàng, filter…).

### 2.3 Stores/context cho state dùng chung — CHỌN (3 store runes có luồng thật)

`cart`, `ui` (đã nêu), và trong flow đặt hàng còn có `orders.ts` (server store). Cả 3 đều có luồng dùng thật chứ không chỉ khai báo.

### 2.4 Các mục KHÔNG chọn và lý do

| Mục                            | Lý do bỏ qua                                                               |
| ------------------------------ | -------------------------------------------------------------------------- |
| Hooks (`handle`/`handleError`) | Ứng dụng không có auth/CSRF tùy chỉnh; SvelteKit đã làm sẵn phần cần thiết |
| Streaming/deferred data        | Dữ liệu catalog rất nhỏ, không có nguồn chậm                               |
| Adapter cụ thể                 | Đồ án chưa nghiên cứu sâu deploy; giữ `adapter-auto`                       |

---

## 3. Minh chứng tối thiểu — bảng đối chiếu

| Yêu cầu                                  | Bằng chứng                                                                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ≥ 1 route dùng `load`                    | **3 route**: `/` , `/products/[id]`, `/order-success` (+ server action cũng đọc form)                                                                                     |
| ≥ 1 tương tác đổi state                  | Tìm kiếm + lọc (`Catalog`), thêm/xoá giỏ (`cart`), đổi vận chuyển/coupon (`checkout`), slider ảnh, modal tracking                                                         |
| Chỉ ra file/module server-only + tại sao | `src/lib/server/catalog.ts`, `orders.ts` — import duy nhất bởi `+page.server.ts`; chứa logic/dữ liệu không muốn lộ client, SvelteKit chặn import `$lib/server` vào client |
| Form action có luồng thật                | Đặt hàng: form → `?/place` → validate + tính tiền server → `saveOrder` → `redirect 303` → `/order-success` SSR                                                            |
| Store có luồng thật                      | `cart`: thêm → badge → drawer → checkout → clear; `ui`: drawer/toast                                                                                                      |

**Không phạm 3 điều "chưa đạt nếu...":** component dùng đầy đủ cơ chế SvelteKit (load/action/enhance/SSR); không có secret trong code client (grep xác nhận); phân biệt rõ dữ liệu load ở server (catalog, order) vs sinh ở browser (giỏ hàng, form).

---

## 4. Trả lời các câu hỏi tự kiểm

**"Hàm `load` này chạy ở đâu và khi nào?"** — `load` trong `+page.server.ts` luôn chạy **trên server**: khi SSR (mỗi request HTTP) và khi điều hướng client (SvelteKit triệu hồi qua fetch). Dữ liệu trả về được serialize và đưa vào props `data` của page. Nhờ vậy client không bao giờ chạy code đọc catalog.

**"Nếu code này dùng `window`/`localStorage` thì có chạy được ở server không?"** — Không: server (Node) không có `window`/`document`/`localStorage`. Trong dự án này browser state (giỏ hàng) nằm trong class runes cài ở client side và chỉ đọc qua store; không dùng browser API ở server. Nếu cần sau này, phải bọc `if (browser)` hoặc đặt trong `onMount`/`$effect`.

**"Form action giải quyết vấn đề gì so với fetch thủ công?"** — (1) Dùng đúng HTTP: HTML form có thể vận hành không cần JS, `use:enhance` thêm fetch khi có JS (progressive enhancement); (2) SvelteKit lo phần serialization (`devalue`) và điều hướng (`applyActionResult`) — không tự xử lý redirect/fail/error; (3) có sẵn bảo vệ CSRF phía server; (4) action để logic mutation gom về server, client chỉ nhận UI state — phù hợp "đã chọn thì phải hiểu cơ chế và kết quả".

---

## 5. Tầng 3 — hiện trạng (chưa claim đạt)

Có một phần a11y nền tảng (aria-label cho nút icon, `sr-only`, `role="dialog"` + `aria-modal` cho drawer/modal, đóng bằng Escape, `loading="lazy"` trên ảnh) nhưng **không có số liệu Lighthouse/Core Web Vitals** nên chưa đủ minh chứng để tính là đạt hạng mục "Accessibility/performance". Các hạng mục còn lại (kéo thả, 3D, virtual list, realtime, rich editor, PWA) không phù hợp phạm vi đồ án.

---

## 6. Đã kiểm chứng thực tế (các lệnh đã chạy thành công)

```bash
npm run check    # svelte-check: 0 errors, 0 warnings
npm run lint     # prettier + eslint: sạch
npm run build    # build production OK
```

Và smoke test luồng form action bằng HTTP (không cần trình duyệt):

```text
POST /checkout?/place  →  {"type":"redirect","status":303,"location":"/order-success?order=MOC-XXXX"}
GET  /order-success?order=MOC-XXXX  →  200 (SSR) chứa: #MOC-XXXX, tên người nhận,
     480.000 / 55.000 / 35.000 / 570.000đ, "VietQR"
POST thiếu trường / giỏ trống → {"type":"failure","status":400,"data":{"error": …}, …}
```

Điều này chứng minh luồng action + redirect + SSR load hoạt động end-to-end kể cả khi tắt JavaScript.

---

## 7. Cấu trúc file liên quan

```text
src/
├─ lib/
│  ├─ server/
│  │  ├─ catalog.ts          # server-only: dữ liệu sản phẩm (nguồn chân lý về giá)
│  │  └─ orders.ts           # server-only: kho đơn hàng in-memory
│  ├─ cart.svelte.ts         # store client runes: giỏ hàng
│  ├─ ui.svelte.ts           # store client runes: drawer/toast
│  ├─ checkout.ts            # hằng số dùng chung client+server (phí, mã, label)
│  ├─ types.ts               # kiểu dữ liệu (Product, Order, CartItem…)
│  └─ components/
│     ├─ Catalog.svelte      # state local + $derived + tương tác thêm giỏ
│     ├─ ProductDetail.svelte# state local + click slider
│     └─ Header.svelte       # đọc cart.count (state dùng chung)
└─ routes/
   ├─ +page.server.ts                    # load: products + categories
   ├─ +page.svelte                       # <Catalog products={data.products} …/>
   ├─ products/[id]/+page.server.ts      # load: params.id, error(404), related
   ├─ cart/+page.svelte
   ├─ checkout/+page.server.ts           # action "place" (form action)
   ├─ checkout/+page.svelte              # <form action="?/place" use:enhance>
   └─ order-success/
      ├─ +page.server.ts                 # load: ?order= → SSR
      └─ +page.svelte                    # biên lai, timeline, modal tracking
```
