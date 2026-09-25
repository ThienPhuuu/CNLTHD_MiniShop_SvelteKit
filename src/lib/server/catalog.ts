import type { Product } from '$lib/types';

export const products: Product[] = [
	{ id: 'linen-desk-set', name: 'Bộ bàn làm việc Linen', category: 'Không gian sống', price: 890000, accent: '#d9c6a5', description: 'Tối giản, ấm áp và vừa vặn cho góc làm việc nhỏ.' },
	{ id: 'ceramic-cup', name: 'Cốc gốm Morning', category: 'Đồ dùng hằng ngày', price: 185000, accent: '#b6c8c2', description: 'Một chiếc cốc thủ công cho nhịp bắt đầu chậm rãi.' },
	{ id: 'canvas-tote', name: 'Túi canvas Field Notes', category: 'Phụ kiện', price: 320000, accent: '#d7a98c', description: 'Bền, nhẹ và đủ rộng cho một ngày di chuyển linh hoạt.' },
	{ id: 'scented-candle', name: 'Nến thơm After Rain', category: 'Không gian sống', price: 270000, accent: '#c9b8d8', description: 'Hương gỗ ẩm và lá xanh cho buổi tối dịu hơn.' }
];