export const SHIPPING_FEE: Record<string, number> = { standard: 30000, express: 55000 };

export const GIFT_FEE = 35000;

export const SHIPPING_METHODS = ['standard', 'express'] as const;
export const PAYMENT_METHODS = ['vietqr', 'card', 'cod'] as const;

export const CITY_LABELS: Record<string, string> = {
	HCM: 'TP. Hồ Chí Minh',
	HN: 'Hà Nội',
	DN: 'Đà Nẵng',
	QN: 'Quảng Nam (Hội An)',
	BD: 'Bình Dương'
};

export const DISTRICT_LABELS: Record<string, string> = {
	Q3: 'Quận 3',
	Q1: 'Quận 1',
	BT: 'Bình Thạnh',
	PN: 'Phú Nhuận',
	TD: 'Thành phố Thủ Đức'
};

export const WARD_LABELS: Record<string, string> = {
	P6: 'Phường Võ Thị Sáu',
	P2: 'Phường 2',
	P4: 'Phường 4',
	P9: 'Phường 9'
};

export const PAYMENT_LABELS: Record<string, string> = {
	vietqr: 'VietQR',
	card: 'Thẻ quốc tế',
	cod: 'COD'
};
