import type { CartItem } from '$lib/cart.svelte';

export type OrderRecipient = {
	fullname: string;
	phone: string;
	email: string;
	cityLabel: string;
	districtLabel: string;
	wardLabel: string;
	address: string;
	note: string;
};

export type Order = {
	id: string;
	items: CartItem[];
	subtotal: number;
	shippingFee: number;
	giftFee: number;
	discount: number;
	total: number;
	shipping: 'standard' | 'express';
	payment: 'vietqr' | 'card' | 'cod';
	createdAt: Date;
	recipient: OrderRecipient;
};

class PlacedOrder {
	order = $state<Order | null>(null);

	place(order: Order) {
		this.order = order;
	}
	clear() {
		this.order = null;
	}
}

export const placedOrder = new PlacedOrder();
