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
