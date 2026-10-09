export type Product = {
	id: string;
	name: string;
	category: string;
	categoryId: string;
	price: number;
	description: string;
	image: string;
	artisan: string;
	origin: string;
	material: string;
	size: string;
	detail: string;
	stock: number;
	oldPrice?: number;
	gallery?: string[];
};

export type Category = {
	id: string;
	label: string;
};

export type CartItem = Product & { quantity: number };

export type OrderLine = { id: string; quantity: number };

export type OrderRecipient = {
	fullname: string;
	phone: string;
	email: string;
	cityLabel: string;
	districtLabel: string;
	wardLabel: string;
	address: string;
	note: string;
};

export type Order = {
	id: string;
	items: CartItem[];
	subtotal: number;
	shippingFee: number;
	giftFee: number;
	discount: number;
	total: number;
	shipping: 'standard' | 'express';
	payment: 'vietqr' | 'card' | 'cod';
	createdAt: Date;
	recipient: OrderRecipient;
};
