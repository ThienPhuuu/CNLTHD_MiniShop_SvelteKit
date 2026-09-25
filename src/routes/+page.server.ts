import { products } from '$lib/server/catalog';

export function load() {
	return { products, categories: ['Tất cả', ...new Set(products.map((product) => product.category))] };
}