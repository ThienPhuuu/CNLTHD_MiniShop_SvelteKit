import type { CartItem, Product } from '$lib/types';

class Cart {
	items = $state<CartItem[]>([]);

	get count() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}
	get total() {
		return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
	}
	add(product: Product, quantity = 1): string | null {
		const amount = Math.floor(quantity);
		if (product.stock === 0) return 'Sản phẩm tạm hết hàng';
		if (!Number.isFinite(amount) || amount < 1) return 'Số lượng không hợp lệ';

		const item = this.items.find((entry) => entry.id === product.id);
		const totalQuantity = (item?.quantity ?? 0) + amount;
		if (totalQuantity > product.stock) return 'Số lượng vượt quá tồn kho hiện tại';

		if (item) {
			item.quantity = totalQuantity;
			return null;
		}
		this.items.push({ ...product, quantity: amount });
		return null;
	}
	remove(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
	}
	decrease(id: string) {
		const item = this.items.find((entry) => entry.id === id);
		if (!item) return;
		if (item.quantity === 1) {
			this.remove(id);
			return;
		}
		item.quantity -= 1;
	}
	clear() {
		this.items = [];
	}
}

export const cart = new Cart();
