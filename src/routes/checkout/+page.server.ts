import { fail, redirect } from '@sveltejs/kit';
import {
	CITY_LABELS,
	COUPON_CODE,
	COUPON_MIN,
	COUPON_VALUE,
	DISTRICT_LABELS,
	GIFT_FEE,
	PAYMENT_METHODS,
	SHIPPING_FEE,
	SHIPPING_METHODS,
	WARD_LABELS
} from '$lib/checkout';
import { fetchProducts } from '$lib/server/catalog';
import { createOrderId, saveOrder } from '$lib/server/orders';
import type { Order, OrderLine, Product } from '$lib/types';

export const actions = {
	place: async ({ request, fetch }) => {
		const form = await request.formData();
		const field = (key: string) => String(form.get(key) ?? '').trim();

		const fullname = field('fullname');
		const phone = field('phone');
		const email = field('email');
		const city = field('city');
		const district = field('district');
		const ward = field('ward');
		const address = field('address');
		const note = field('note');

		if (!fullname || !phone || !email || !address) {
			return fail(400, { error: 'Bạn hãy điền đầy đủ thông tin người nhận trước khi đặt hàng.' });
		}

		let parsed: unknown;
		try {
			parsed = JSON.parse(String(form.get('items') ?? '[]'));
		} catch {
			parsed = [];
		}

		const lines: OrderLine[] = Array.isArray(parsed) ? parsed : [];
		if (lines.length === 0) {
			return fail(400, { error: 'Giỏ hàng đang trống. Vui lòng chọn vài món đồ mộc trước nhé.' });
		}

		let catalog: Product[] | null;
		try {
			catalog = await fetchProducts(fetch);
		} catch {
			catalog = null;
		}
		if (!catalog) {
			return fail(503, {
				error: 'Không kiểm tra được kho hàng từ nguồn dữ liệu. Vui lòng thử lại sau ít phút.'
			});
		}

		const quantities = new Map<string, number>();
		for (const line of lines) {
			const quantity = Math.floor(Number(line?.quantity));
			if (!line?.id || !Number.isFinite(quantity) || quantity < 1) {
				return fail(400, { error: 'Số lượng sản phẩm không hợp lệ.' });
			}
			quantities.set(line.id, (quantities.get(line.id) ?? 0) + quantity);
		}

		const items: Order['items'] = [];
		let subtotal = 0;
		for (const [id, quantity] of quantities) {
			const product = catalog.find((entry) => entry.id === id);
			if (!product) continue;
			if (product.stock === 0) {
				return fail(400, { error: `Sản phẩm "${product.name}" tạm hết hàng.` });
			}
			if (quantity > product.stock) {
				return fail(400, {
					error: `Số lượng "${product.name}" vượt quá tồn kho hiện tại.`
				});
			}
			items.push({ ...product, quantity });
			subtotal += product.price * quantity;
		}
		if (items.length === 0) {
			return fail(400, { error: 'Không tìm thấy sản phẩm trong giỏ hàng.' });
		}

		const shippingMethod = field('shipping_method');
		const shipping = (SHIPPING_METHODS as readonly string[]).includes(shippingMethod)
			? (shippingMethod as Order['shipping'])
			: 'standard';
		const paymentMethod = field('payment_method');
		const payment = (PAYMENT_METHODS as readonly string[]).includes(paymentMethod)
			? (paymentMethod as Order['payment'])
			: 'vietqr';

		const shippingFee = SHIPPING_FEE[shipping];
		const couponApplied = String(form.get('coupon_applied')) === 'true';
		const discount =
			couponApplied && field('coupon').toUpperCase() === COUPON_CODE && subtotal >= COUPON_MIN
				? COUPON_VALUE
				: 0;
		const total = subtotal + shippingFee + GIFT_FEE - discount;

		const order: Order = {
			id: createOrderId(),
			items,
			subtotal,
			shippingFee,
			giftFee: GIFT_FEE,
			discount,
			total,
			shipping,
			payment,
			createdAt: new Date(),
			recipient: {
				fullname: fullname || 'Khách mộc.',
				phone,
				email,
				cityLabel: CITY_LABELS[city] ?? city,
				districtLabel: DISTRICT_LABELS[district] ?? district,
				wardLabel: WARD_LABELS[ward] ?? ward,
				address: address || 'Chưa cung cấp',
				note
			}
		};

		saveOrder(order);
		redirect(303, `/order-success?order=${order.id}`);
	}
};
