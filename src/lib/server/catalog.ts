import { error } from '@sveltejs/kit';
import type { Product } from '$lib/types';

const CATALOG_URL = 'https://dummyjson.com/c/4d07-230f-4ad2-b021';

export async function fetchProducts(fetcher: typeof globalThis.fetch): Promise<Product[]> {
	const response = await fetcher(CATALOG_URL);
	if (!response.ok) {
		error(502, 'Không lấy được danh mục sản phẩm từ nguồn dữ liệu.');
	}
	const data: unknown = await response.json();
	if (!Array.isArray(data)) {
		error(502, 'Nguồn dữ liệu trả về sai định dạng.');
	}
	return data as Product[];
}
