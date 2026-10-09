import { getOrder } from '$lib/server/orders';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const id = url.searchParams.get('order');
	return { order: id ? getOrder(id) : null };
};
