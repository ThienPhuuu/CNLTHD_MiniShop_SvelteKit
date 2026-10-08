import { env } from '$env/dynamic/public';
import type { Product } from '$lib/types';


export async function load({ fetch }) {
	const response = await fetch(env.PUBLIC_API_URL);

	if (!response.ok) {
		throw new Error('Không thể tải danh sách sản phẩm');
	}

	const products: Product[] = await response.json();

	return { products, categories: ['Tất cả', ...new Set(products.map((product) => product.category))] };
}