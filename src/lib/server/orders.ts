import type { Order } from '$lib/types';

const orders = new Map<string, Order>();

export function saveOrder(order: Order): void {
	orders.set(order.id, order);
}

export function getOrder(id: string): Order | null {
	return orders.get(id) ?? null;
}
