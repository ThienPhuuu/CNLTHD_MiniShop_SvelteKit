import { error } from '@sveltejs/kit';
import { products } from '$lib/server/catalog';

export function load({ params }) {
	const product = products.find((entry) => entry.id === params.id);
	if (!product) {
		error(404, 'Không tìm thấy sản phẩm');
	}
	const related = products.filter((entry) => entry.id !== product.id).slice(0, 3);
	return { product, related };
}
