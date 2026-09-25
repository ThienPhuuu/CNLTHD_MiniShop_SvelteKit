import type { Product } from '$lib/types';

export type CartItem = Product & { quantity: number };

class Cart {
	items = $state<CartItem[]>([]);

	get count() { return this.items.reduce((total, item) => total + item.quantity, 0); }
	get total() { return this.items.reduce((total, item) => total + item.price * item.quantity, 0); }
	add(product: Product) {
		const item = this.items.find((entry) => entry.id === product.id);
		if (item) { item.quantity += 1; return; }
		this.items.push({ ...product, quantity: 1 });
	}
	remove(id: string) { this.items = this.items.filter((item) => item.id !== id); }
	decrease(id: string) {
		const item = this.items.find((entry) => entry.id === id);
		if (!item) return;
		if (item.quantity === 1) { this.remove(id); return; }
		item.quantity -= 1;
	}
}

export const cart = new Cart();