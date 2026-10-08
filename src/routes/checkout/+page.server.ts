import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const phone = String(formData.get('phone') ?? '').trim();
		const address = String(formData.get('address') ?? '').trim();
		const paymentMethod = String(formData.get('paymentMethod') ?? '').trim();

		if (!name || !phone || !address || !paymentMethod) {
			return fail(400, {
				success: false,
				error: 'Vui lòng nhập đầy đủ thông tin đặt hàng.'
			});
		}

		return {
			success: true,
			message: 'Đặt hàng thành công! Cảm ơn bạn đã mua hàng.'
		};
	}
};