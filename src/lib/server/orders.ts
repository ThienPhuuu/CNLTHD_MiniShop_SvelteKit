import type { Order } from '$lib/types';

const orders = new Map<string, Order>();
const ORDER_ID_PREFIX = 'MOC-';

/**
 * Sinh mã đơn dạng `MOC-<UUID>`.
 *
 * UUID có 122 bit ngẫu nhiên nên gần như không thể đoán được. Sau khi sinh,
 * hàm kiểm tra lại trong kho đơn: nếu mã đã tồn tại thì sinh mã mới và lặp
 * đến khi không trùng, nhờ vậy `saveOrder` không bao giờ ghi đè đơn đã có.
 */
export function createOrderId(): string {
	let id = `${ORDER_ID_PREFIX}${crypto.randomUUID()}`;
	while (orders.has(id)) {
		id = `${ORDER_ID_PREFIX}${crypto.randomUUID()}`;
	}
	return id;
}

export function saveOrder(order: Order): void {
    if (orders.has(order.id)) {
        throw new Error(`Mã đơn hàng ${order.id} đã tồn tại.`);
    }

    orders.set(order.id, order);
}

export function getOrder(id: string): Order | null {
	return orders.get(id) ?? null;
}
