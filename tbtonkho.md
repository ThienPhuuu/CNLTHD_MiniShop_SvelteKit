# Báo cáo xử lý tồn kho và giỏ hàng

## Mục tiêu

- Không cho thêm sản phẩm khi `stock === 0`.
- Gộp số lượng sản phẩm theo `productId`.
- Không cho tổng số lượng vượt quá tồn kho.
- Hiển thị thông báo lỗi rõ ràng khi thao tác không hợp lệ.
- Bảo vệ lại dữ liệu ở phía server khi checkout.

## Các file đã sửa

### `src/lib/cart.svelte.ts`

- Cập nhật phương thức `cart.add()`.
- Gộp sản phẩm đã có trong giỏ theo `product.id`.
- Kiểm tra số lượng tồn kho trước khi thêm.
- Từ chối sản phẩm có `stock === 0` với thông báo:

  ```text
  Sản phẩm tạm hết hàng
  ```

- Từ chối số lượng vượt tồn kho với thông báo:

  ```text
  Số lượng vượt quá tồn kho hiện tại
  ```

- Từ chối số lượng không hợp lệ.
- Phương thức trả về `null` nếu thêm thành công hoặc chuỗi lỗi nếu thao tác bị chặn.

### `src/lib/components/Catalog.svelte`

- Kiểm tra kết quả từ `cart.add()`.
- Hiển thị toast lỗi khi sản phẩm hết hàng hoặc vượt tồn kho.
- Chỉ mở giỏ hàng khi thêm sản phẩm thành công.

### `src/lib/components/ProductDetail.svelte`

- Áp dụng kiểm tra tồn kho cho nút **Thêm vào giỏ hàng**.
- Áp dụng kiểm tra tồn kho cho nút **Mua ngay**.
- Nếu thao tác lỗi, không chuyển trang và hiển thị toast lỗi.
- Áp dụng cùng logic cho nút **Mua kèm** ở sản phẩm liên quan.
- Số lượng được thêm từ trang chi tiết được kiểm tra theo tổng tồn kho.

### `src/lib/components/CartDrawer.svelte`

- Kiểm tra tồn kho khi người dùng bấm nút tăng số lượng.
- Không cho tăng quá `stock`.
- Hiển thị toast lỗi màu đỏ khi thao tác bị chặn.

### `src/routes/cart/+page.svelte`

- Áp dụng kiểm tra tồn kho cho nút tăng số lượng trong trang giỏ hàng.
- Hiển thị toast lỗi khi số lượng vượt tồn kho.

### `src/routes/checkout/+page.server.ts`

- Gộp các dòng sản phẩm trùng ID trước khi tạo đơn hàng.
- Kiểm tra số lượng hợp lệ ở phía server.
- Từ chối sản phẩm hết hàng.
- Từ chối tổng số lượng vượt quá tồn kho.
- Không còn tự động giảm số lượng bằng `Math.min()`.

### `src/lib/ui.svelte.ts`

- Thêm trạng thái `toastType` với hai loại:
  - `success`
  - `error`
- Giữ nguyên `showToast()` cho thông báo thành công.
- Thêm `showError()` cho thông báo lỗi.

### `src/lib/components/Toast.svelte`

- Toast lỗi có nền đỏ và icon cảnh báo.
- Toast lỗi hiển thị ở phía trên bên phải.
- Toast thành công vẫn hiển thị ở phía dưới bên phải như trước.

## Luồng hoạt động

1. Người dùng bấm thêm sản phẩm hoặc tăng số lượng.
2. `cart.add()` tìm sản phẩm đã có theo `product.id`.
3. Số lượng mới được tính bằng:

   ```text
   số lượng hiện tại + số lượng muốn thêm
   ```

4. Nếu tổng số lượng lớn hơn `stock`, thao tác bị chặn.
5. Nếu `stock === 0`, thao tác bị chặn ngay.
6. Nếu hợp lệ, sản phẩm được thêm mới hoặc gộp vào sản phẩm hiện có.
7. Khi checkout, server kiểm tra lại toàn bộ dữ liệu một lần nữa.

## Cách test nhanh

Trong `src/lib/server/catalog.ts`, có thể tạm thay:

```ts
return data as Product[];
```

bằng:

```ts
const products = data as Product[];

return products.map((product, index) =>
	index === 0 ? { ...product, stock: 0 } : product
);
```

Sau đó chạy:

```powershell
npm run dev
```

Mở sản phẩm đầu tiên và kiểm tra:

- Bấm **Thêm vào giỏ hàng**: phải hiện `Sản phẩm tạm hết hàng`.
- Bấm **Mua ngay**: không được chuyển sang trang giỏ hàng.
- Sản phẩm không được thêm vào giỏ.

Để test vượt tồn kho, đổi tạm `stock: 0` thành `stock: 1`, sau đó:

1. Thêm sản phẩm số lượng `1`.
2. Bấm nút `+` hoặc thêm lại sản phẩm.
3. Kiểm tra toast đỏ:

   ```text
   Số lượng vượt quá tồn kho hiện tại
   ```

Sau khi test xong, khôi phục lại:

```ts
return data as Product[];
```

## Kết quả kiểm tra

- `npm run check`: đạt, 0 lỗi và 0 cảnh báo.
- ESLint trên các file đã sửa: đạt.
- Không thay đổi các chức năng không liên quan đến giỏ hàng và tồn kho.