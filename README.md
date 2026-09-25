# mộc. — SvelteKit minishop

Skeleton frontend cho một web bán hàng xây bằng SvelteKit, TypeScript và Svelte 5 runes.

## Chạy dự án

```bash
npm install
npm run dev -- --open
```

Các lệnh hữu ích:

```bash
npm run check   # kiểm tra Svelte và TypeScript
npm run lint    # kiểm tra format và ESLint
npm run build   # build production
```

## Cấu trúc quan trọng

- `src/routes/+page.server.ts`: route `load` lấy catalog và danh mục trước khi render trang chủ.
- `src/lib/server/catalog.ts`: dữ liệu chỉ dùng ở phía server, là nơi phù hợp để thay bằng truy vấn database hoặc API private sau này.
- `src/lib/cart.svelte.ts`: state giỏ hàng dùng Svelte 5 runes; các nút trên giao diện làm state thay đổi và UI tự cập nhật.
- `src/routes/+page.svelte`: trang catalog, tìm kiếm, lọc danh mục và thêm sản phẩm.
- `src/routes/cart/+page.svelte`: trang giỏ hàng, tăng/giảm số lượng và xem tổng tiền.

`+page.server.ts` không được bundle vào client. Vì vậy secret, token hoặc logic truy cập database nên đặt trong module server-only và chỉ trả dữ liệu cần thiết qua `load`; không đặt chúng trong component `.svelte`.

## Hướng phát triển tiếp theo

1. Thay catalog mẫu bằng database/API riêng ở server.
2. Thêm `actions` cho checkout hoặc form đăng nhập.
3. Chọn adapter deploy phù hợp và thêm xác thực người dùng.
4. Bổ sung test, persistence giỏ hàng và xử lý trạng thái loading/error.# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.17.1 create --template minimal --types ts --add prettier eslint --no-install .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
