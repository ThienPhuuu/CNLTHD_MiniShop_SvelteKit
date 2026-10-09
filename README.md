# mộc. — SvelteKit minishop

Skeleton frontend cho một web bán hàng xây bằng SvelteKit, TypeScript và Svelte 5 runes (SSR mặc định).

## Chạy dự án

```bash
npm install
npm run dev -- --open
```

Các lệnh hữu ích:

```bash
npm run check    # kiểm tra Svelte và TypeScript
npm run lint     # kiểm tra format (Prettier) và ESLint
npm run build    # build production
npm run preview  # chạy bản production đã build
```

## Cấu trúc quan trọng

- `src/routes/+page.server.ts` — route `load` lấy catalog và danh mục trước khi render trang chủ; trang catalog, tìm kiếm, lọc danh mục.
- `src/routes/products/[id]/+page.server.ts` — route `load` cho trang chi tiết (nếu không tìm thấy trả `error(404)`), kèm 3 sản phẩm liên quan.
- `src/routes/cart/+page.svelte` — trang giỏ hàng; `cart` dùng Svelte 5 runes, giỏ hàng chỉ ở client.
- `src/routes/checkout/+page.svelte` — form thông tin giao nhận, vận chuyển, thanh toán, mã ưu đãi; khi đặt hàng thành công lưu vào `placedOrder`, xoá giỏ và điều hướng sang `/order-success`.
- `src/routes/order-success/+page.svelte` — xác nhận đơn hàng: biên lai, timeline xưởng, thông tin nhận hàng, modal theo dõi vận chuyển.
- `src/lib/server/catalog.ts` — dữ liệu sản phẩm **server-only** (không bundle vào client); nơi phù hợp để thay bằng database/API sau này.
- `src/lib/cart.svelte.ts`, `src/lib/order.svelte.ts`, `src/lib/ui.svelte.ts` — state dùng chung bằng Svelte 5 runes (giỏ hàng, đơn hàng vừa đặt, toast/drawer).
- `src/html/` — thiết kế gốc (bản tham chiếu) đã chuyển sang các route tương ứng: `home.html`, `product-detail.html`, `checkout.html`, `order-success.html`, `artisan.html`.

Yêu cầu đồ án: `requirements.md`.

## Ghi chú kỹ thuật

`+page.server.ts`, `src/lib/server/*`, `$env/static/private` không được bundle vào client. Vì vậy secret, token hoặc logic truy cập database nên đặt trong module server-only và chỉ trả dữ liệu cần thiết qua `load`; không đặt chúng trong component `.svelte`.