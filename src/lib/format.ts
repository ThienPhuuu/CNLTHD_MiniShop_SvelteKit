export const formatVND = (price: number) => new Intl.NumberFormat('vi-VN').format(price) + '₫';
