import { fetchProducts } from '$lib/server/catalog';
import type { Category } from '$lib/types';

export async function load({ fetch }) {
	const products = await fetchProducts(fetch);
	const categories: Category[] = [{ id: 'all', label: 'Tất cả' }];
	for (const product of products) {
		if (!categories.some((category) => category.id === product.categoryId)) {
			categories.push({ id: product.categoryId, label: product.category });
		}
	}
	return { products, categories };
}
